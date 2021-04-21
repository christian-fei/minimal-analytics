import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'

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
    console.log(query, this.state.filters)

    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + query)
    const data = await req.json()
    this.setState({ data, loading: false })
  }

  componentDidMount () {
    this.getData()
  }

  updateTimeframe (timeframe) {
    const newFilters = Object.assign({}, this.state.filters, { timeframe })
    this.setState({ filters: newFilters }, () => this.getData())
  }
  updateResolution (resolution) {
    const newFilters = Object.assign({}, this.state.filters, { resolution })
    this.setState({ filters: newFilters }, () => this.getData())
  }
  toggleFilter (type, value) {
    const filters = Object.assign({}, this.state.filters)
    if (this.state.filters[type] === value) {
      delete filters[type]
    } else {
      filters[type] = value
    }
    this.setState({ filters }, () => this.getData())
  }

  render (props, { data, loading } = {}) {
    if (Object.keys(data).length === 0) return null
    const maxReferrers = Math.max(...data.referrers.map(r => r.views))
    const maxPages = Math.max(...data.pages.map(r => r.views))
    const chartMaxPageviews = Math.max(...data.chartData.map(d => d[1]))

    console.log(this.state.filters)

    return (
      <div>
        <div class='grid-lg contain'>
          <div class='w-50-lg'>
            <h4>Timeframe</h4>
            <span onClick={() => this.updateTimeframe('today')} class={`select-timeframe filterable ${this.state.filters.timeframe === 'today' && 'active'}`} name='today' id='today'>Today</span>
            <span onClick={() => this.updateTimeframe('past-day')} class={`select-timeframe filterable ${this.state.filters.timeframe === 'past-day' && 'active'}`} name='past-day' id='past-day'>Past day</span>
            <span onClick={() => this.updateTimeframe('past-week')} class={`select-timeframe filterable ${this.state.filters.timeframe === 'past-week' && 'active'}`} name='past-week' id='past-week'>Past week</span>
            <span onClick={() => this.updateTimeframe('past-month')} class={`select-timeframe filterable ${this.state.filters.timeframe === 'past-month' && 'active'}`} name='past-month' id='past-month'>Past month</span>
          </div>
          <div class='w-50-lg'>
            <h4>Resolution</h4>
            <span onClick={() => this.updateResolution('hourly')} class={`select-resolution filterable ${this.state.filters.resolution === 'hourly' && 'active'}`} name='hourly' id='hourly'>Hourly</span>
            {['past-week', 'past-month'].includes(this.state.filters.timeframe) && <span onClick={() => this.updateResolution('daily')} class={`select-resolution filterable ${this.state.filters.resolution === 'daily' && 'active'}`} name='daily' id='daily'>Daily</span>}
            {['today', 'past-day'].includes(this.state.filters.timeframe) && <span onClick={() => this.updateResolution('minutes')} class={`select-resolution filterable ${this.state.filters.resolution === 'minutes' && 'active'}`} name='minutes' id='minutes'>Minutes</span>}
          </div>
        </div>

        <div id="pageviews-chart">
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
            <div id='live'>{data.live}</div>
          </div>
        </div>

        <div class='grid-lg contain'>
          {data.referrers && 
          <div class='w-50-lg' id='referrers'>
            <h2>Top Referrers</h2>
            <ul id='top-referrers'>
              {data.referrers.map((d, i, referrers) => {
                const favicon = `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`
                return <li onClick={() => this.toggleFilter('r', d.r)} class={`filterable ${this.state.filters.r === d.r && 'active'}`} style={{
                  '--data-percentage': (100 - d.views * 80 / maxReferrers) + '%'
                }}>
                  <b class="views">{d.views}</b> <img loading="lazy" class="favicon" src={favicon}/>{d.r}
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

        <div class="contain">
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
                  from <img class="favicon" src={`https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`}/> ${d.r}
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