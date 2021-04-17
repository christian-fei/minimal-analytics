#!/usr/bin/env node
const http = require('http')
const fs = require('fs')
const path = require('path')
const isBot = userAgent => /(bot|check|cloud|crawler|download|monitor|preview|scan|spider|google|qwantify|yahoo|HeadlessChrome)/i.test(userAgent)
const visitorFromRequest = require('./lib/visitor-from-request')
const parseFilters = require('./lib/parse-filters')
const parseResolution = require('./lib/parse-resolution')
const parseOptions = require('./lib/parse-options')
const analytics = require('./lib/analytics')

module.exports = {
  start
}

if (require.main === module) {
  start(process.env)
}

function start (env = process.env, memory) {
  const options = parseOptions(env)

  if (!options.STATS_BASE_URL) throw new Error('MISSING_STATS_BASE_URL')
  if (!options.SITE_BASE_URL) throw new Error('MISSING_SITE_BASE_URL')

  const CLIENT_JS = fs.readFileSync(path.resolve(__dirname, 'client.js'), 'utf-8').replace('{{STATS_BASE_URL}}', options.STATS_BASE_URL)
  const INDEX_HTML = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8').replace(/\{\{SITE_BASE_URL\}\}/g, options.SITE_BASE_URL)

  memory = memory !== undefined ? memory : fs.readFileSync(options.DATA_PATH).toString('utf-8').split('\n').filter(Boolean).map(l => JSON.parse(l))
  const live = {}

  const server = http.createServer(function (req, res) {
    if (isBot(req.headers['user-agent'])) {
      res.statusCode = 401
      return res.end()
    }

    res.setHeader('Access-Control-Allow-Origin', options.SITE_BASE_URL)
    res.setHeader('Access-Control-Request-Method', 'POST,GET')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }

    if (req.method === 'POST' && req.url === '/p') {
      return trackPageview(req, res, options, memory, live)
    }
    if (req.method === 'GET' && req.url === '/live') {
      res.setHeader('Content-type', 'text/plain')
      res.statusCode = 200
      return res.end('' + Object.keys(live).length)
    }
    if (req.method === 'GET' && /\/api(\/past-day|\/today|\/past-week|\/past-month)/.test(req.url)) {
      const analytics = getAnalytics(req.url, memory, live)
      res.setHeader('Content-type', 'application/json')
      res.statusCode = 200
      return res.end(JSON.stringify(analytics))
    }
    if (req.method === 'GET' && req.url === '/client.js') {
      res.setHeader('Content-type', 'text/javascript')
      return res.end(CLIENT_JS)
    }
    res.setHeader('Content-type', 'text/html')
    return res.end(INDEX_HTML)
  })

  setInterval(() => {
    Object.keys(live).forEach(visitor => {
      if (live[visitor] < Date.now() - 15000) delete live[visitor]
    })
  }, 5000)

  console.log(`listening on http://127.0.0.1:${options.HTTP_PORT}`)
  server.listen(options.HTTP_PORT)
  return { server, memory }
}

function trackPageview (req, res, options, memory, live) {
  const requestData = []
  return req
    .on('error', (err) => {
      console.error(err)
      res.statusCode = 500
      res.end()
    })
    .on('data', (chunk) => {
      requestData.push(chunk)
    })
    .on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(requestData).toString())
        if (Object.keys(body).length > 4 || Object.keys(body).find(k => !['r', 'w', 'p', 't'].includes(k))) {
          res.statusCode = 422
          return res.end()
        }
        const userAgent = req.headers['user-agent']
        const visitor = visitorFromRequest(req)
        const data = { ...body, type: body.t || 'pageview', v: visitor, u: userAgent, d: new Date().toISOString() }

        live[visitor] = Date.now()

        if (data.type === 'pageview') {
          memory.push(data)
          fs.appendFile(options.DATA_PATH, JSON.stringify(data) + '\n', (err) => {
            if (err) console.error('failed to write data', err)
          })
          console.log(data.type, data.d, data.p, visitor, userAgent)
        }

        res.statusCode = 200
        res.end()
      } catch (err) {
        console.error(err)
        res.statusCode = 422
        res.end()
      }
    })
}

function getAnalytics (url, memory, live) {
  const filters = parseFilters(url)
  let startDate = Date.now() - 1000 * 60 * 60
  let resolution = parseResolution(url)

  if (/\/today/.test(url)) startDate = +new Date(new Date().toISOString().substring(0, 10) + 'T00:00:00.000Z')
  if (/\/past-day/.test(url)) startDate = Date.now() - 1000 * 60 * 60 * 24
  if (/\/past-week/.test(url)) startDate = Date.now() - 1000 * 60 * 60 * 24 * 7
  if (/\/past-month/.test(url)) startDate = Date.now() - 1000 * 60 * 60 * 24 * 31

  if (resolution === 'minutes' && /(\/past-week|\/past-month)/.test(url)) resolution = 'daily'
  if (resolution === 'daily' && /(\/past-day|\/today)/.test(url)) resolution = 'hourly'

  let data = memory.filter(m => +new Date(m.d) > startDate).reverse()
  const keys = Object.keys(filters)
  if (keys.length > 0) {
    data = data.filter(d => keys.every(k => d[k] === filters[k]))
  }
  const pages = analytics.calculatePagesBreakdown(data, 25)
  const referrers = analytics.calculateReferrersBreakdown(data, 25)
  const chartData = analytics.calculateChartData(data, resolution)

  const pageviewsCount = data.length
  const visitorsCount = [...new Set(data.map(d => d.v))].length

  return {
    data: data.slice(0, 25),
    pages,
    referrers,
    chartData,
    pageviewsCount,
    visitorsCount,
    live: Object.keys(live).length
  }
}
