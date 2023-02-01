import { h } from 'preact'
import { domainFromUrl } from '../lib/domain-from-url'

export default function ({ data, loading, filters = {}, toggleFilter }) {
  if (!data) return null
  const { referrers = [] } = data
  const { pages = [] } = data
  const { events = [] } = data
  const maxEvents = Math.max(...events.map(e => e.views))
  const maxReferrers = Math.max(...referrers.map(r => r.views))
  const maxPages = Math.max(...pages.map(r => r.views))

  return h('div', {}, [
    h('div', {class: `${loading && 'loading'}`}, [
      h('div', { class: `grid-lg contain` }, [
        h('div', { class: 'w-50-lg', id: 'referrers' }, [
          h('h2', {}, 'Top Referrers'),
          h('ul', { id: 'top-referrers' }, referrers.map((d) => {
            const favicon = `https://icons.duckduckgo.com/ip3/${domainFromUrl(d.r)}.ico`
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
      ]),
      h('div', { class: 'contain' }, [
        h('h2', {}, 'Top Events'),
        h('ul', { id: 'top-events' }, events.map((d) => {
          return h('li', {
            key: d.e,
            // class: `filterable ${filters.e === d.e && 'active'}`,
            style: {
              '--data-percentage': (100 - d.views * 80 / maxEvents) + '%'
            },
            // onClick: () => toggleFilter('e', d.e)
          }, [
            h('div', {}, [
              h('b', { class: 'views' }, d.views),
              // h('img', { loading: 'lazy', class: 'favicon', src: favicon }, []),
              d.e
            ])
          ])
        }))
      ])
    ])
  ])
}
