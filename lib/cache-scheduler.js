import * as analyticsCache from './analytics-cache.js'

export {
  start
}

function start (memory = []) {
  const entries = [{
    interval: 1000 * 30,
    timeframe: 'today',
    resolution: 'daily'
  },{
    interval: 1000 * 30,
    timeframe: 'today',
    resolution: 'hourly'
  },{
    interval: 1000 * 30,
    timeframe: 'past-day',
    resolution: 'daily'
  },{
    interval: 1000 * 30,
    timeframe: 'past-day',
    resolution: 'hourly'
  },{
    interval: 1000 * 30,
    timeframe: 'past-week',
    resolution: 'daily'
  },{
    interval: 1000 * 30,
    timeframe: 'past-week',
    resolution: 'hourly'
  },{
    interval: 1000 * 55,
    timeframe: 'past-month',
    resolution: 'hourly'
  },{
    interval: 1000 * 55,
    timeframe: 'past-month',
    resolution: 'hourly'
  },{
    interval: 1000 * 55,
    timeframe: 'past-6-months',
    resolution: 'daily'
  },{
    interval: 1000 * 55,
    timeframe: 'past-year',
    resolution: 'daily'
  },{
    interval: 1000 * 55,
    timeframe: 'past-year',
    resolution: 'monthly'
  }]

  for (const options of entries) {
    setTimeout(cache, options.interval, options)
    cache(options, true)
  }
  function cache (options = {}, once = false) {
    console.log(new Date().toISOString(), 'cache update', options)
  
    analyticsCache.getAll(`/api/?resolution=${options.resolution}&timeframe=${options.timeframe}`, memory, {})
  
    !once && setTimeout(cache, options.interval, options)
  }
}

