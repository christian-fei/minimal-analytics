import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router';
import Filters from '../../components/filters'
import PageviewsChart from '../../components/pageviews-chart'
import Stats from '../../components/stats'
import Breakdown from '../../components/breakdown'
import History from '../../components/history'

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

    return (
      <div class={`${loading && 'loading'}`}>
        <Filters 
          updateResolution={this.updateResolution.bind(this)}
          updateTimeframe={this.updateTimeframe.bind(this)}
          filters={this.state.filters}
        ></Filters>

        <PageviewsChart
          resolution={this.state.filters.resolution}
          data={this.state.data}
        ></PageviewsChart>

        <Stats
          data={this.state.data}
        ></Stats>

        <Breakdown
          data={this.state.data}
          filters={this.state.filters}
          toggleFilter={this.toggleFilter.bind(this)}
        ></Breakdown>

        <History
          data={this.state.data}
          filters={this.state.filters}
          toggleFilter={this.toggleFilter.bind(this)}
        ></History>

      </div>
    )
  }
}
