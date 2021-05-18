import { h } from '../modules/preact.js'

export default function ({ data, filters = {}, toggleFilter }) {
  if (!data) return null
  if (!Number.isFinite(data.visitorsCount)) return null
  if (!Number.isFinite(data.pageviewsCount)) return null

  let live = data.live || {}
  if (Object.keys(filters).length > 2) {
    live = Object.keys(live).reduce((acc, key) => {
      const filterKeys = Object.keys(filters).filter(k => !['timeframe', 'resolution'].includes(k))
      if (!filterKeys.every(f => live[key].pageview[f] === filters[f])) return acc
      return Object.assign(acc, { [key]: live[key] })
    }, {})
  }

  return h('div', {}, [
    h('div', { class: 'grid contain text-lg' }, [
      h('div', { class: 'w-50' }, [
        h('h2', {}, 'Visitors'),
        h('div', { id: 'visitors-count' }, data.visitorsCount)
      ]),
      h('div', { class: 'w-50' }, [
        h('h2', {}, 'Pageviews'),
        h('div', { id: 'pageviews-count' }, data.pageviewsCount)
      ]),
      h('div', { class: 'w-50' }, [
        h('h2', {}, 'Bounce rate'),
        h('div', { id: 'bounce-rate' }, (data.visitorsCount / data.pageviewsCount * 100).toFixed(0) + '%')
      ]),
      h('div', { class: 'w-50' }, [
        h('h2', {}, 'Live'),
        h('div', { id: 'live' }, Object.keys(live).length)
      ])
    ]),
    h('div', { class: 'contain', id: 'live-pages' }, [
      Object.keys(live).length > 0 && h('h2', {}, ['Live pages ', h('span', { class: 'live-dot' }, [])]),
      h('ul', {}, Object.keys(live).reduce((acc, curr) => {
        const existing = acc.find(({ p }) => p === live[curr].pageview.p)
        if (existing) {
          existing.c++
          return acc
        }
        return acc.concat([{ p: live[curr].pageview.p, c: 1 }])
      }, [])
        .sort((a, b) => a.c - b.c)
        .map(({ p, c }) =>
          h('li', {
            class: `filterable ${filters.p === p && 'active'}`,
            onClick: () => toggleFilter('p', p),
            key: p
          }, `${c} · ${p}`)
        )
      )
    ].filter(Boolean)),
    h('div', { class: 'contain', id: 'live-referrers' }, [
      Object.keys(live).length > 0 && h('h2', {}, ['Live referrers ', h('span', { class: 'live-dot' }, [])]),
      h('ul', {}, Object.keys(live).reduce((acc, curr) => {
        const existing = acc.find(({ r }) => r === live[curr].pageview.r)
        if (existing) {
          existing.c++
          return acc
        }
        return acc.concat([{ r: live[curr].pageview.r, c: 1 }])
      }, [])
        .sort((a, b) => a.c - b.c)
        .map(({ r, c }) =>
          h('li', {
            class: `filterable ${filters.r === r && 'active'}`,
            onClick: () => toggleFilter('r', r),
            key: r
          }, `${c} · ${(r || '').replace('https://', '').replace('http://', '') || 'none'}`)
        )
      )
    ].filter(Boolean))
  ].filter(Boolean))
}
