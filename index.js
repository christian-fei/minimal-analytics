#!/usr/bin/env node
const http = require('http')
const nodeStatic = require('node-static')
const fs = require('fs')
const path = require('path')
const isBot = require('./lib/is-bot')
const trackPageview = require('./lib/track-pageview')
const parseOptions = require('./lib/parse-options')
const analytics = require('./lib/analytics')
const migrate = require('./lib/migrate')
const backup = require('./lib/backup')
const parsePageview = require('./lib/parse-pageview')

module.exports = {
  start
}

if (require.main === module) {
  start(process.env)
}

async function start (env = process.env, memory) {
  const options = parseOptions(env)

  console.log('starting', options)

  await migrate.start(options)
  backup.start(options)

  const file = new (nodeStatic.Server)(path.resolve(__dirname, 'client', 'build'))

  const CLIENT_JS = fs.readFileSync(path.resolve(__dirname, 'client.js'), 'utf-8').replace('{{STATS_BASE_URL}}', options.STATS_BASE_URL)

  memory = memory !== undefined ? memory : fs.readFileSync(options.DATA_PATH).toString('utf-8').split('\n').filter(Boolean).map(l => JSON.parse(l))
  const live = {}

  const server = http.createServer(function (req, res) {
    if (isBot(req.headers['user-agent'])) {
      res.statusCode = 200
      return res.end()
    }

    res.setHeader('Access-Control-Allow-Origin', options.SITE_BASE_URL)
    res.setHeader('Access-Control-Request-Method', 'POST,GET')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
      res.statusCode = 200
      return res.end()
    }
    console.log(new Date().toISOString(), req.method, req.url)

    if (req.method === 'POST' && req.url === '/p') {
      parsePageview(req, (err, pageview) => {
        if (err) return console.error('error parsing pageview', err.message)
        trackPageview(pageview, options, memory, live)
        console.log(pageview.d, pageview.p, pageview.v)
      })
      res.statusCode = 200
      return res.end()
    }
    if (req.method === 'GET' && /^\/api/.test(req.url)) {
      const result = analytics.getAll(req.url, memory, live)
      res.setHeader('Content-type', 'application/json')
      res.statusCode = 200
      return res.end(JSON.stringify(result))
    }
    if (req.method === 'GET' && req.url === '/client.js') {
      res.setHeader('Content-type', 'text/javascript')
      return res.end(CLIENT_JS)
    }
    return file.serve(req, res)
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
