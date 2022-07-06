;(function () {
  if (/(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.host)) return
  setTimeout(function () {
    track({
      r: document.referrer,
      p: window.location.pathname,
      w: window.innerWidth
    })
  }, 1000)

  heartbeat()

  function heartbeat (i = 0) {
    if (i > 30) return
    setTimeout(heartbeat, 10000, ++i)
    if (document.hidden) { return }
    track({
      t: 'heartbeat',
      r: document.referrer,
      p: window.location.pathname,
      w: window.innerWidth
    })
  }

  function track (data) {
    const baseUrl = '{{STATS_BASE_URL}}/p'
    try {
      window.fetch(baseUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'text/plain'
        },
        method: 'POST'
      })
    } catch (err) {
      const req = new window.XMLHttpRequest()
      req.open('POST', baseUrl, true)
      req.setRequestHeader('Content-Type', 'text/plain')
      req.send(JSON.stringify(data))
      req.onreadystatechange = Function.prototype
    }
  }
})()
