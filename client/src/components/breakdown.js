export default function ({ data, loading, filters, toggleFilter }) {
  const maxReferrers = Math.max(...data.referrers.map(r => r.views))
  const maxPages = Math.max(...data.pages.map(r => r.views))

  return (
    <div class={`grid contain ${loading && 'loading'}`}>
      {data.referrers &&
        <div class='w-50-lg' id='referrers'>
          <h2>Top Referrers</h2>
          <ul id='top-referrers'>
            {data.referrers.map((d) => {
              const favicon = `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`
              return (
                <li
                  key={d.r}
                  onClick={() => toggleFilter('r', d.r)} class={`filterable ${filters.r === d.r && 'active'}`} style={{
                    '--data-percentage': (100 - d.views * 80 / maxReferrers) + '%'
                  }}
                >
                  <b class='views'>{d.views}</b> <img loading='lazy' class='favicon' src={favicon} />{d.r.replace('https://', '').replace('http://', '')}
                </li>
              )
            })}
          </ul>
        </div>}
      {data.pages &&
        <div class='w-50-lg' id='pages'>
          <h2>Top Pages</h2>
          <ul id='top-pages'>
            {data.pages.map((d) => {
              return (
                <li
                  key={d.p}
                  onClick={() => toggleFilter('p', d.p)} class={`filterable ${filters.p === d.p && 'active'}`} style={{
                    '--data-percentage': (100 - d.views * 80 / maxPages) + '%'
                  }}
                >
                  <b class='views'>{d.views}</b> {d.p}
                </li>
              )
            })}
          </ul>
        </div>}
    </div>
  )
}

function domain (url) {
  if (!url) return '/'
  let a = document.createElement('a')
  a.href = url
  return a.hostname
}
