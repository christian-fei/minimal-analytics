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

  return (
    <div>
      <div className={`${loading && 'loading'}`}>
        <div className="grid-lg contain">
          <div className="w-50-lg" id="referrers">
            <h2>Top Referrers</h2>
            <ul id="top-referrers">
              {referrers.map((d) => {
                const favicon = `https://icons.duckduckgo.com/ip3/${domainFromUrl(d.r)}.ico`;
                return (
                  <li
                    key={d.r}
                    className={`filterable ${filters.r === d.r && 'active'}`}
                    style={{ '--data-percentage': `${100 - d.views * 80 / maxReferrers}%` }}
                    onClick={() => toggleFilter('r', d.r)}
                  >
                    <div>
                      <b className="views">{d.views}</b>
                      <img loading="lazy" className="favicon" src={favicon} />
                      {d.r.replace('https://', '').replace('http://', '') || 'none'}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-50-lg" id="pages">
            <h2>Top Pages</h2>
            <ul id="top-pages">
              {pages.map((d) => {
                return (
                  <li
                    key={d.p}
                    onClick={() => toggleFilter('p', d.p)}
                    className={`filterable ${filters.p === d.p && 'active'}`}
                    style={{ '--data-percentage': `${100 - d.views * 80 / maxPages}%` }}
                  >
                    <b className="views">{d.views}</b>
                    {d.p}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="contain">
          <h2>Top Events</h2>
          <ul id="top-events">
            {events.map((d) => {
              return (
                <li
                  key={d.e}
                  className={`filterable ${filters.e === d.e && 'active'}`}
                  style={{ '--data-percentage': `${100 - d.views * 80 / maxEvents}%` }}
                  onClick={() => toggleFilter('e', d.e)}
                >
                  <div>
                    <b className="views">{d.views}</b>
                    {d.e}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
