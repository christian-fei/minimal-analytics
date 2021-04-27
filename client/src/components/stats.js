export default function ({ data, filters, toggleFilter }) {
  let live = data.live
  if (Object.keys(filters).length > 2) {
    live = Object.keys(live).reduce((acc, key) => {
      const filterKeys = Object.keys(filters).filter(k => !['timeframe', 'resolution'].includes(k))
      if (!filterKeys.every(f => live[key].pageview[f] === filters[f])) return acc
      return Object.assign(acc, { [key]: live[key] })
    }, {})
  }

  return (
    <div>
      <div class='grid contain'>
        <div class='w-50'>
          <h2>Visitors</h2>
          <div id='visitors-count'>{data.visitorsCount}</div>
        </div>
        <div class='w-50'>
          <h2>Pageviews</h2>
          <div id='pageviews-count'>{data.pageviewsCount}</div>
        </div>
        <div class='w-50'>
          <h2>Live</h2>
          <div id='live'>{Object.keys(live).length}</div>
        </div>
      </div>
      {Object.keys(live).length > 0 &&
        <div class='contain'>
          <h2>Live pages <span class='live-dot' /></h2>
          <ul>
            {Object.keys(live).reduce((acc, curr) => {
              const existing = acc.find(({ p }) => p === live[curr].pageview.p)
              if (existing) {
                existing.c++
                return acc
              }
              return acc.concat([{ p: live[curr].pageview.p, c: 1 }])
            }, []).map(({ p, c }) => <li class={`filterable ${filters.p === p && 'active'}`} onClick={() => toggleFilter('p', p)} key={p}>{c} &middot; {p}</li>)}
          </ul>
        </div>}
    </div>
  )
}
