#!/usr/bin/env node

import fs from 'fs'
import http from 'http'
import serveStatic from 'serve-static'
import finalhandler from 'finalhandler'
import { URL } from 'url'

import isBot from './lib/is-bot.js'
import trackPageview from './lib/track-pageview.js'
import parseOptions from './lib/parse-options.js'
import parsePageview from './lib/parse-pageview.js'
import readMemory from './lib/read-memory.js'
import * as analyticsCache from './lib/analytics-cache.js'
import * as backup from './lib/backup.js'
import * as cacheScheduler from './lib/cache-scheduler.js'

export {
  start
}

if (import.meta.url === `file://${process.argv[1]}`) {
  start(process.env)
}

async function start (env = process.env, memory) {
  const options = parseOptions(env)

  if (!options.STATS_BASE_URL) throw new Error('MISSING_STATS_BASE_URL')
  if (!options.SITE_BASE_URL) throw new Error('MISSING_SITE_BASE_URL')

  console.log('starting', JSON.stringify(options))

  backup.start(options)

  const serve = serveStatic('dashboard/dist')

  const CLIENT_JS = fs.readFileSync(new URL('./client.js', import.meta.url).pathname, 'utf-8').replace('{{STATS_BASE_URL}}', options.STATS_BASE_URL)

  memory = readMemory(options, memory)
  cacheScheduler.start(memory)

  const live = {}
  const connections = []

  const server = http.createServer(function (req, res) {
    if (isBot(req.headers['user-agent'])) return res.end()

    res.setHeader('Access-Control-Allow-Origin', options.SITE_BASE_URL)
    res.setHeader('Access-Control-Request-Method', 'POST,GET')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') return res.end()

    console.log(new Date().toISOString(), req.method, req.url)

    if (req.method === 'POST' && req.url === '/p') {
      parsePageview(req, (err, pageview) => {
        if (err) return console.error('error parsing pageview', err.message)
        trackPageview(pageview, options, memory, live)
        console.log(pageview.d, pageview.p, pageview.v)
        sendSSE(JSON.stringify(live), connections)
      })
      return res.end('ok')
    }
    if (req.method === 'GET' && /^\/live/.test(req.url)) {
      res.setHeader('Content-type', 'application/json')
      return res.end(JSON.stringify(live))
    }
    if (req.method === 'GET' && /^\/api/.test(req.url)) {
      const result = analyticsCache.getAll(req.url, memory, live)
      res.setHeader('Content-type', 'application/json')
      return res.end(JSON.stringify(result))
    }
    if (req.method === 'GET' && req.url === '/client.js') {
      res.setHeader('Content-type', 'text/javascript')
      return res.end(CLIENT_JS)
    }
    if (req.headers.accept && req.headers.accept.indexOf('text/event-stream') >= 0) {
      handleSSE(res, connections)
      return sendSSE(JSON.stringify(live), [res])
    }
    return serve(req, res, finalhandler(req, res))
  })

  setInterval(() => {
    Object.keys(live).forEach(visitor => {
      if (live[visitor] && live[visitor].heartbeat < Date.now() - 15000) delete live[visitor]
    })
    sendSSE(JSON.stringify(live), connections)
  }, 5000)

  console.log(`listening on http://127.0.0.1:${options.HTTP_PORT}`)
  server.listen(options.HTTP_PORT)
  return { server, memory }

  function handleSSE (res, connections = []) {
    connections.push(res)
    res.on('close', () => {
      connections.splice(connections.findIndex(c => res === c), 1)
    })
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })
  }

  function sendSSE (data, connections = []) {
    connections.forEach(connection => {
      if (!connection) return
      const id = new Date().toISOString()
      connection.write('id: ' + id + '\n')
      connection.write('data: ' + data + '\n\n')
    })
  }
}
