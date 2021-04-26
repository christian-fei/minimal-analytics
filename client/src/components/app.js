import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import Analytics from '../routes/analytics'

export default class App extends Component {
  state = {
    data: {},
    loading: false,
    filters: {
      timeframe: 'today',
      resolution: 'hourly'  
    }
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

  async handleRoute(e) {
    console.log('handle route', e.url)
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, {[k[0]]: decodeURIComponent(k[1])}), {})
      this.setState({ filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.getData()
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


  updateTimeframe (timeframe) {
    const newFilters = Object.assign({}, this.state.filters, { timeframe })
    if (['today', 'past-day'].includes(timeframe) && ['monthly', 'daily'].includes(newFilters.resolution)) {
      newFilters.resolution = 'hourly'
    }
    if (['past-week', 'past-month'].includes(timeframe) && ['minutes', 'hourly', 'monthly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-year'].includes(timeframe) && ['minutes', 'hourly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'monthly'
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

  render () {
    return (
      <div id='app'>
        <Router onChange={this.handleRoute.bind(this)}>
          <Analytics 
            data={this.state.data}
            filters={this.state.filters}
            loading={this.state.loading}
            updateResolution={this.updateResolution.bind(this)}
            updateTimeframe={this.updateTimeframe.bind(this)}
            toggleFilter={this.toggleFilter.bind(this)}
            path='/' />
        </Router>
      </div>
    )
  }
}
