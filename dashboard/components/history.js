import { h } from 'preact'
import { domainFromUrl } from '../lib/domain-from-url'
import { visitorColor } from '../lib/visitor-color'

export default function ({ data, filters = {}, toggleFilter }) {
  if (!data) return null
  if (!Array.isArray(data.data)) return null

  return (
    <div className="contain">
      <ul>
        {data.data.map((d, i) => d.t !== 'event' && (
          <li className="pageview" key={d.d}>
            <div
              className={`filterable ${filters.v === d.v && 'active'}`}
              onClick={() => toggleFilter('v', d.v)}
            >
              <time>{d.d.substring(0, 19)}</time>
              {d.v} <span style={{ 'background-color': visitorColor(d.v) }} className="visitor dot"></span>
            </div>
            <div
              className={`filterable ${filters.p === d.p && 'active'}`}
              onClick={() => toggleFilter('p', d.p)}
            >
              <b>{d.p}</b>
            </div>
            {d.r && (
              <div
                className={`filterable ${filters.r === d.r && 'active'}`}
                onClick={() => toggleFilter('r', d.r)}
              >
                from
                <img className="favicon" src={`https://icons.duckduckgo.com/ip3/${domainFromUrl(d.r)}.ico`} />
                {d.r.replace('https://', '').replace('http://', '')}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
