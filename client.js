;(async () => {
  if (/localhost|127.0.0.1/.test(window.location.host)) return
  const STATS_BASE_URL = '{{STATS_BASE_URL}}'
  setTimeout(() => {
    window.fetch(STATS_BASE_URL + '/p', {
      method: 'POST',
      body: JSON.stringify({
        r: document.referrer,
        p: window.location.pathname,
        w: window.innerWidth
      })
    })
  }, 3000)

  h()

  function h (i = 0) {
    if (i > 100) return
    setTimeout(h, 10000, i++)
    if (document.visibilityState !== 'visible') { return }
    window.fetch(STATS_BASE_URL + '/p', {
      method: 'POST',
      body: JSON.stringify({
        t: 'heartbeat',
        r: document.referrer,
        p: window.location.pathname,
        w: window.innerWidth
      })
    })
  }
})()
