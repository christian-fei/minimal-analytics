import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import Dashboard from './dashboard.js'

const initialState = {
  data: {},
  mounted: false,
  loading: false,
  filters: {
    timeframe: 'today',
    resolution: 'hourly'
  },
  theme: 'light'
}


export default class App extends Component {
  state = initialState

  componentDidMount () {
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, { [k[0]]: decodeURIComponent(k[1]) }), {})
      this.setState({ mounted: true, filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.setState({ mounted: true }, () => this.getData())
    }
    setInterval(() => this.getData(), 60 * 1000)

    const eventSource = new window.EventSource('/')

    eventSource.onmessage = (message) => {
      if (!message || !message.data) return console.error('skipping empty message')
      try {
        const live = JSON.parse(message.data, {})
        this.setState({ data: Object.assign({}, this.state.data, { live }) })
      } catch (err) {
        console.error('sse parse error', err)
      }
    }
  }

  async handleRoute (e) {
    if (!this.state.mounted) return
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, { [k[0]]: decodeURIComponent(k[1]) }), {})
      this.setState({ filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.getData()
    }
  }

  async getData () {
    if (this.state.loading) return
    this.setState({ loading: true })

    if (this.state.filters.s !== '') {
      console.log('filtering by search term')
      let query = ''
      const cleanFilters = Object.assign({}, this.state.filters)
      delete cleanFilters.p
      delete cleanFilters.r
      delete cleanFilters.v
      if (Object.keys(cleanFilters).length > 0) {
        query = '?' + Object.keys(cleanFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(cleanFilters[curr])}`]), []).join('&')
      }
      const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
      const req = await window.fetch(host + '/api/' + query)
      const data = await req.json()
      this.setState({ data, loading: false })
  
      return
    }
    let query = ''
    if (Object.keys(this.state.filters).length > 0) {
      query = '?' + Object.keys(this.state.filters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(this.state.filters[curr])}`]), []).join('&')
    }
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + query)
    const data = await req.json()
    this.setState({ data, loading: false })
  }

  clearCustomTimeframe () {
    const newFilters = Object.assign({}, this.state.filters, { timeframe: 'past-day' })
    delete newFilters.from
    delete newFilters.to
    this.setState({ filters: newFilters }, () =>
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }

  updateCustomTimeframe (customFrom, customTo = Date.now()) {
    // debugger
    if (!Number.isFinite(+new Date(customFrom))) return
    if (!Number.isFinite(+new Date(customTo))) return
    const newFilters = Object.assign({}, this.state.filters, { from: customFrom, to: customTo })
    delete newFilters.timeframe
    this.setState({ filters: newFilters }, () =>
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }

  updateTimeframe (timeframe) {
    const newFilters = Object.assign({}, this.state.filters, { timeframe })
    if (['today', 'past-day'].includes(timeframe) && ['monthly', 'daily'].includes(newFilters.resolution)) {
      newFilters.resolution = 'hourly'
    }
    if (['past-week'].includes(timeframe) && ['monthly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-month'].includes(timeframe) && ['minutes', 'monthly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-6-months'].includes(timeframe) && ['minutes'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-year'].includes(timeframe) && ['minutes', 'hourly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'monthly'
    }
    this.setState({ filters: newFilters }, () =>
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }

  updateResolution (resolution) {
    const newFilters = Object.assign({}, this.state.filters, { resolution })
    this.setState({ filters: newFilters }, () =>
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }

  toggleFilter (type, value) {
    const newFilters = Object.assign({}, this.state.filters)
    if (newFilters[type] === value) {
      delete newFilters[type]
    } else {
      newFilters[type] = value
    }
    this.setState({ filters: newFilters }, () =>
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }

  toggleTheme () {
    this.setState({ theme: this.state.theme === 'dark' ? 'light' : 'dark' })
  }
  
  updateSearchTerm (searchTerm = '') {
    const filters = Object.assign({}, this.state.filters, { s: searchTerm })
    this.setState({ filters }, () =>
      route('?' + Object.keys(this.state.filters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(this.state.filters[curr])}`]), []).join('&'))
    )

  }

  render() {
    return (
      <div id="app" className={`theme-${this.state.theme}`}>
        <Router onChange={this.handleRoute.bind(this)}>
          <Dashboard
            data={this.state.data}
            filters={this.state.filters}
            loading={this.state.loading}
            theme={this.state.theme}
            updateResolution={this.updateResolution.bind(this)}
            updateTimeframe={this.updateTimeframe.bind(this)}
            updateCustomTimeframe={this.updateCustomTimeframe.bind(this)}
            clearCustomTimeframe={this.clearCustomTimeframe.bind(this)}
            toggleFilter={this.toggleFilter.bind(this)}
            toggleTheme={this.toggleTheme.bind(this)}
            updateSearchTerm={this.updateSearchTerm.bind(this)}
            path="/"
          />
        </Router>
      </div>
    )
  }
}
