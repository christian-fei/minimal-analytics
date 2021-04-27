export default function ({ data, toggleFilter }) {
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
          <div id='live'>{Object.keys(data.live).length}</div>
        </div>
      </div>
      {Object.keys(data.live).length > 0 &&
        <div class='contain'>
          <h2>Live pages <span class='live-dot' /></h2>
          <ul>
            {Object.keys(data.live).reduce((acc, curr) => {
              const existing = acc.find(({ p }) => p === data.live[curr].pageview.p)
              if (existing) {
                existing.c++
                return acc
              }
              return acc.concat([{ p: data.live[curr].pageview.p, c: 1 }])
            }, []).map(({ p, c }) => <li onClick={() => toggleFilter('p', p)} key={p}>{c} &middot; {p}</li>)}
          </ul>
        </div>}
    </div>
  )
}
