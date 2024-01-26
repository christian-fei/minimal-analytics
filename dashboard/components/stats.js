import { h } from 'preact'

export default function ({ data, filters = {}, toggleFilter }) {
  if (!data) return null
  if (!Number.isFinite(data.visitorsCount)) return null
  if (!Number.isFinite(data.pageviewsCount)) return null

  let live = data.live || {}
  if (Object.keys(filters).length > 2) {
    live = Object.keys(live).reduce((acc, key) => {
      const filterKeys = Object.keys(filters).filter(k => ['p', 'r', 'v'].includes(k))
      if (!filterKeys.every(f => live[key].pageview[f] === filters[f])) return acc
      return Object.assign(acc, { [key]: live[key] })
    }, {})
  }

  return (
    <div className="stats">
      <div className="grid contain text-lg">
        <div className="w-50">
          <h2>Visitors</h2>
          <div id="visitors-count">{data.visitorsCount}</div>
        </div>
        <div className="w-50">
          <h2>Pageviews</h2>
          <div id="pageviews-count">{data.pageviewsCount}</div>
        </div>
        <div className="w-50">
          <h2>Bounce rate</h2>
          <div id="bounce-rate">{(data.visitorsCount / data.pageviewsCount * 100).toFixed(0) + '%'}</div>
        </div>
        <div className="w-50">
          <h2>Live</h2>
          <div id="live">{Object.keys(live).length}</div>
        </div>
      </div>
      <div className="contain" id="live-pages">
        {Object.keys(live).length > 0 && (
          <div>
            <h2>
              Live pages <span className="live-dot" />
            </h2>
            <ul>
              {Object.keys(live).reduce((acc, curr) => {
                const existing = acc.find(({ p }) => p === live[curr].pageview.p)
                if (existing) {
                  existing.c++
                  return acc
                }
                return acc.concat([{ p: live[curr].pageview.p, c: 1 }])
              }, [])
                .sort((a, b) => a.c - b.c)
                .map(({ p, c }) => (
                  <li
                    className={`filterable ${filters.p === p && 'active'}`}
                    onClick={() => toggleFilter('p', p)}
                    key={p}
                  >
                    {`${c} · ${p}`}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className="contain" id="live-referrers">
        {Object.keys(live).length > 0 && (
          <div>
            <h2>
              Live referrers <span className="live-dot" />
            </h2>
            <ul>
              {Object.keys(live).reduce((acc, curr) => {
                const existing = acc.find(({ r }) => r === live[curr].pageview.r)
                if (existing) {
                  existing.c++
                  return acc
                }
                return acc.concat([{ r: live[curr].pageview.r, c: 1 }])
              }, [])
                .sort((a, b) => a.c - b.c)
                .map(({ r, c }) => (
                  <li
                    className={`filterable ${filters.r === r && 'active'}`}
                    onClick={() => toggleFilter('r', r)}
                    key={r}
                  >
                    {`${c} · ${(r || '').replace('https://', '').replace('http://', '') || 'none'}`}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
