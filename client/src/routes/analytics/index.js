import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export default class Analytics extends Component {
  state = {
    data: {},
    timeframe: 'today',
    resolution: 'hourly',
    loading: false
  }
  async getData () {
    console.log('getting data', this.state.timeframe)
    this.setState({ loading: true })
    let query = '?'
    if (this.state.resolution) {
      query += `resolution=${this.state.resolution}`
    }
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + this.state.timeframe + query)
    const data = await req.json()
    this.setState({ data, loading: false })
  }

  componentDidMount () {
    this.getData()
  }

  updateTimeframe (timeframe) {
    this.setState({ timeframe }, () => this.getData())
  }
  updateResolution (resolution) {
    this.setState({ resolution }, () => this.getData())
  }

  render (props, { data, loading } = {}) {
    if (Object.keys(data).length === 0) return null
    const maxReferrers = Math.max(...data.referrers.map(r => r.views))
    const maxPages = Math.max(...data.pages.map(r => r.views))
    const chartMaxPageviews = Math.max(...data.chartData.map(d => d.views))

    return (
      <div>
        <div class='grid-lg contain'>
          <div class='w-50-lg'>
            <h4>Timeframe</h4>
            <span onClick={() => this.updateTimeframe('today')} class={`select-timeframe filterable ${this.state.timeframe === 'today' && 'active'}`} name='today' id='today'>Today</span>
            <span onClick={() => this.updateTimeframe('past-day')} class={`select-timeframe filterable ${this.state.timeframe === 'past-day' && 'active'}`} name='past-day' id='past-day'>Past day</span>
            <span onClick={() => this.updateTimeframe('past-week')} class={`select-timeframe filterable ${this.state.timeframe === 'past-week' && 'active'}`} name='past-week' id='past-week'>Past week</span>
            <span onClick={() => this.updateTimeframe('past-month')} class={`select-timeframe filterable ${this.state.timeframe === 'past-month' && 'active'}`} name='past-month' id='past-month'>Past month</span>
          </div>
          <div class='w-50-lg'>
            <h4>Resolution</h4>
            <span onClick={() => this.updateResolution('hourly')} class={`select-resolution filterable ${this.state.resolution === 'hourly' && 'active'}`} name='hourly' id='hourly'>Hourly</span>
            {['past-week', 'past-month'].includes(this.state.timeframe) && <span onClick={() => this.updateResolution('daily')} class={`select-resolution filterable ${this.state.resolution === 'daily' && 'active'}`} name='daily' id='daily'>Daily</span>}
            {['today', 'past-day'].includes(this.state.timeframe) && <span onClick={() => this.updateResolution('minutes')} class={`select-resolution filterable ${this.state.resolution === 'minutes' && 'active'}`} name='minutes' id='minutes'>Minutes</span>}
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
                  <td style={{'--start': i === 0 ? 0 : data.chartData[i - 1].views / chartMaxPageviews, '--size': d.views / chartMaxPageviews}}>
                    {data.chartData.length < 25 &&
                      <span class="data">{d.views}</span>
                    }
                    <span class="tooltip">
                      {d.date.replace(':00.000Z', '')}<br/>{d.views} pageviews
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
                return <li class="filterable" style={{
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
                return <li class="filterable" style={{
                  '--data-percentage': (100 - d.views * 80 / maxPages) + '%'
                }}>
                  <b class="views">{d.views}</b> {d.p}
                </li>
              })}

            </ul>
          </div>
          }
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

