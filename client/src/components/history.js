import { h } from 'preact'

export default function ({ data, filters = {}, toggleFilter }) {
  if (!data) return null
  if (!Array.isArray(data.data)) return null
  return (
    <div class='contain'>
      <ul>
        {data.data.map((d, i) => {
          return (
            <li class='pageview' key={d.d}>
              <div class={`filterable ${filters.v === d.v && 'active'}`} onClick={() => toggleFilter('v', d.v)}>
                <time>{d.d.substring(0, 19)}</time> {d.v} <span style={{ 'background-color': visitorColor(d.v) }} class='visitor dot' />
              </div>
              <div class={`filterable ${filters.p === d.p && 'active'}`} onClick={() => toggleFilter('p', d.p)}>
                <b>{d.p}</b>
              </div>
              {d.r &&
                <div class={`filterable ${filters.r === d.r && 'active'}`} onClick={() => toggleFilter('r', d.r)}>
                  from <img class='favicon' src={`https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`} /> {d.r.replace('https://', '').replace('http://', '')}
                </div>}
            </li>
          )
        })}
      </ul>
    </div>
  )
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
