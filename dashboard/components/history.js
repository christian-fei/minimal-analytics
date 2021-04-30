import { h } from '../modules/preact.js'

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
              h('img', { class: 'favicon', src: `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico` }, [
                d.r.replace('https://', '').replace('http://', '')
              ])
            ])
        ].filter(Boolean))
      ))
  ])
}

function domain (url) {
  if (!url) return '/'
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}

function visitorColor (v) {
  return '#' + intToRGB(hashCode(v))

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  function hashCode (str) { // java String#hashCode
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  function intToRGB (i) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

    return '00000'.substring(0, 6 - c.length) + c
  }
}
