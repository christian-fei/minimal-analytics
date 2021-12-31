import { h, Component } from '../modules/preact.js'
import { Router, route } from '../modules/preact-router.js'

import Analytics from './analytics.js'

const initialState = {
  data: {},
  mounted: false,
  loading: false,
  filters: {
    timeframe: 'today',
    resolution: 'hourly'  
  }
}

if (localStorage.getItem('state')) {
  Object.assign(initialState, JSON.parse(localStorage.getItem('state')))
}

export default class App extends Component {
  state = initialState

  componentDidMount () {
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, {[k[0]]: decodeURIComponent(k[1])}), {})
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
        this.setState({ data: Object.assign({}, this.state.data, {live}) })

      } catch (err) {
        console.error('sse parse error', err)
      }
    }
  }

  async handleRoute(e) {
    if (!this.state.mounted) return
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, {[k[0]]: decodeURIComponent(k[1])}), {})
      this.setState({ filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.getData()
    }
  }

  async getData () {
    if (this.state.loading) return
    this.setState({ loading: true })
    let query = ''
    if (Object.keys(this.state.filters).length > 0) {
      query = `?` + Object.keys(this.state.filters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(this.state.filters[curr])}`]), []).join('&')
    }
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + query)
    const data = await req.json()
    this.setState({ data, loading: false }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  clearCustomTimeframe () {
    const newFilters = Object.assign({}, this.state.filters, {timeframe: 'past-day'})
    delete newFilters.from
    delete newFilters.to
    this.setState({ filters: newFilters }, () => 
      route('?' + Object.keys(newFilters).reduce((acc, curr) => acc.concat([`${curr}=${encodeURIComponent(newFilters[curr])}`]), []).join('&'))
    )
  }
  updateCustomTimeframe (customFrom, customTo = Date.now()) {
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
    if (['past-week'].includes(timeframe) && ['minutes', 'monthly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-month'].includes(timeframe) && ['minutes', 'monthly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-6-months'].includes(timeframe) && ['minutes', 'hourly'].includes(newFilters.resolution)) {
      newFilters.resolution = 'daily'
    }
    if (['past-year'].includes(timeframe) && ['minutes', 'hourly', 'daily'].includes(newFilters.resolution)) {
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

  render () {
    return h('div', {id: 'app'}, [
      h(Router, {onChange: this.handleRoute.bind(this)}, [
        h(Analytics, {          
          data: this.state.data,
          filters: this.state.filters,
          loading: this.state.loading,
          updateResolution: this.updateResolution.bind(this),
          updateTimeframe: this.updateTimeframe.bind(this),
          updateCustomTimeframe: this.updateCustomTimeframe.bind(this),
          clearCustomTimeframe: this.clearCustomTimeframe.bind(this),
          toggleFilter: this.toggleFilter.bind(this),
          path: '/'
        }, [])
      ])
    ])
  }
}
