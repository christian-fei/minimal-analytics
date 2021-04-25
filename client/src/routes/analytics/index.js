import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router';
import Filters from '../../components/filters'

export default class Analytics extends Component {
  state = {
    data: {},
    loading: false,
    filters: {
      timeframe: 'today',
      resolution: 'hourly'  
    }
  }
  async getData () {
    this.setState({ loading: true })
    let query = ''
    if (Object.keys(this.state.filters).length > 0) {
      query = `?` + Object.keys(this.state.filters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(this.state.filters[curr])}`]), []).join('&')
    }
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + query)
    const data = await req.json()
    this.setState({ data, loading: false })
  }

  componentDidMount () {
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, {[k[0]]: decodeURIComponent(k[1])}), {})
      this.setState({ filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.getData()
    }
    setInterval(() => this.getData(), 10000)
  }

  updateTimeframe (timeframe) {
    const newFilters = Object.assign({}, this.state.filters, { timeframe })
    if (['today', 'past-day'].includes(timeframe) && newFilters.resolution === 'daily') {
      newFilters.resolution = 'hourly'
    }
    if (['past-week', 'past-month'].includes(timeframe) && newFilters.resolution === 'minutes') {
      newFilters.resolution = 'hourly'
    }
    route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    this.setState({ filters: newFilters }, () => this.getData())
  }
  updateResolution (resolution) {
    const newFilters = Object.assign({}, this.state.filters, { resolution })
    route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    this.setState({ filters: newFilters }, () => this.getData())
  }
  toggleFilter (type, value) {
    const newFilters = Object.assign({}, this.state.filters)
    if (newFilters[type] === value) {
      delete newFilters[type]
    } else {
      newFilters[type] = value
    }
    route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    this.setState({ filters: newFilters }, () => this.getData())
  }

  render (props, { data, loading } = {}) {
    if (Object.keys(data).length === 0) return null
    const maxReferrers = Math.max(...data.referrers.map(r => r.views))
    const maxPages = Math.max(...data.pages.map(r => r.views))
    const chartMaxPageviews = Math.max(...data.chartData.map(d => d[1]))

    return (
      <div>
        <Filters 
          updateResolution={this.updateResolution.bind(this)}
          updateTimeframe={this.updateTimeframe.bind(this)}
          filters={this.state.filters}
        ></Filters>

        <div id="pageviews-chart" class={`${loading && 'loading'}`}>
          <table class="charts-css column show-labels show-primary-axis">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Pageviews</th>
              </tr>
            </thead>

            <tbody>
              {data.chartData.map((d, i) => 
                <tr>
                  <td style={{'--start': i === 0 ? 0 : data.chartData[i - 1][1] / chartMaxPageviews, '--size': d[1] / chartMaxPageviews}}>
                    {data.chartData.length < 25 &&
                      <span class="data">{d[1]}</span>
                    }
                    <span class="tooltip">
                      {d[0].replace(':00.000Z', '')}<br/>{d[1]} pageviews
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div class={`grid contain ${loading && 'loading'}`}>
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
            <div id='live'>{data.live}</div>
          </div>
        </div>

        <div class={`grid contain ${loading && 'loading'}`}>
          {data.referrers && 
          <div class='w-50-lg' id='referrers'>
            <h2>Top Referrers</h2>
            <ul id='top-referrers'>
              {data.referrers.map((d, i, referrers) => {
                const favicon = `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`
                return <li onClick={() => this.toggleFilter('r', d.r)} class={`filterable ${this.state.filters.r === d.r && 'active'}`} style={{
                  '--data-percentage': (100 - d.views * 80 / maxReferrers) + '%'
                }}>
                  <b class="views">{d.views}</b> <img loading="lazy" class="favicon" src={favicon}/>{d.r.replace('https://', '').replace('http://', '')}
                </li>
              })}
            </ul>
          </div>
          }
          {data.pages && 
          <div class='w-50-lg' id='pages'>
            <h2>Top Pages</h2>
            <ul id='top-pages'>
            {data.pages.map((d, i, pages) => {
                return <li onClick={() => this.toggleFilter('p', d.p)} class={`filterable ${this.state.filters.p === d.p && 'active'}`} style={{
                  '--data-percentage': (100 - d.views * 80 / maxPages) + '%'
                }}>
                  <b class="views">{d.views}</b> {d.p}
                </li>
              })}

            </ul>
          </div>
          }
        </div>

        <div class={`contain ${loading && 'loading'}`}>
          <ul>
            {data.data.map(d => {
              return <li class="pageview">
                <div class={`filterable ${this.state.filters.v === d.v && 'active'}`} onClick={() => this.toggleFilter('v', d.v)}>
                  <time>{d.d.substring(0, 19)}</time> {d.v} <span style={{'background-color': visitorColor(d.v)}} class="visitor"></span>
                </div>
                <div class={`filterable ${this.state.filters.p === d.p && 'active'}`} onClick={() => this.toggleFilter('p', d.p)}>
                  <b>{d.p}</b>
                </div>
                {d.r && <div class={`filterable ${this.state.filters.r === d.r && 'active'}`} onClick={() => this.toggleFilter('r', d.r)}>
                  from <img class="favicon" src={`https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`}/> {d.r.replace('https://', '').replace('http://', '')}
                </div>}
              </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function domain (url) {
  if (!url) return '/'
  var a = document.createElement('a')
  a.href = url
  return a.hostname
}

function visitorColor (v) {
  return '#' + intToRGB(hashCode(v))

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 

  function intToRGB(i){
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }
}