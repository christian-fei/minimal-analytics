import { h } from 'preact'

export default function ({ data, loading, filters = {}, toggleFilter }) {
  if (!data) return null
  const { referrers = [] } = data
  const { pages = [] } = data
  const maxReferrers = Math.max(...referrers.map(r => r.views))
  const maxPages = Math.max(...pages.map(r => r.views))

  return h('div', {}, [
    h('div', { class: `grid-lg contain ${loading && 'loading'}` }, [
      h('div', { class: 'w-50-lg', id: 'referrers' }, [
        h('h2', {}, 'Top Referrers'),
        h('ul', { id: 'top-referrers' }, referrers.map((d) => {
          const favicon = `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`
          return h('li', {
            key: d.r,
            class: `filterable ${filters.r === d.r && 'active'}`,
            style: {
              '--data-percentage': (100 - d.views * 80 / maxReferrers) + '%'
            },
            onClick: () => toggleFilter('r', d.r)
          }, [
            h('div', {}, [
              h('b', { class: 'views' }, d.views),
              h('img', { loading: 'lazy', class: 'favicon', src: favicon }, []),
              d.r.replace('https://', '').replace('http://', '') || 'none'
            ])
          ])
        }))
      ]),
      h('div', { class: 'w-50-lg', id: 'pages' }, [
        h('h2', {}, 'Top Pages'),
        h('ul', { id: 'top-pages' }, pages.map((d) => {
          return h('li', {
            key: d.p,
            onClick: () => toggleFilter('p', d.p),
            class: `filterable ${filters.p === d.p && 'active'}`,
            style: {
              '--data-percentage': (100 - d.views * 80 / maxPages) + '%'
            }
          }, [
            h('b', { class: 'views' }, d.views),
            d.p
          ])
        })
        )
      ])
    ])
  ])
}

function domain (url) {
  if (!url) return '/'
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}
