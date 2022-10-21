import { h } from 'preact'
import { domainFromUrl } from '../lib/domain-from-url'
import { visitorColor } from '../lib/visitor-color'

export default function ({ data, filters = {}, toggleFilter }) {
  if (!data) return null
  if (!Array.isArray(data.data)) return null
  return h('div', { class: 'contain' }, [
    h('ul', {},
      data.data.map((d, i) =>
        h('li', { class: 'pageview', key: d.d }, [
          h('div', { class: `filterable ${filters.v === d.v && 'active'}`, onClick: () => toggleFilter('v', d.v) }, [
            h('time', {}, d.d.substring(0, 19)),
            d.v,
            ' ',
            h('span', { style: { 'background-color': visitorColor(d.v) }, class: 'visitor dot' }, [])
          ]),
          h('div', { class: `filterable ${filters.p === d.p && 'active'}`, onClick: () => toggleFilter('p', d.p) }, [
            h('b', {}, d.p)
          ]),
          d.r &&
            h('div', { class: `filterable ${filters.r === d.r && 'active'}`, onClick: () => toggleFilter('r', d.r) }, [
              'from ',
              h('img', { class: 'favicon', src: `https://icons.duckduckgo.com/ip3/${domainFromUrl(d.r)}.ico` }),
              d.r.replace('https://', '').replace('http://', '')
            ])
        ].filter(Boolean))
      ))
  ])
}
