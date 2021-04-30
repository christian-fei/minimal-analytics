import { h, Component } from '../modules/preact.js'
import { Router, route } from '../modules/preact-router.js'

import Analytics from './analytics.js'

export default class App extends Component {
  state = {
    data: {},
    mounted: false,
    loading: false,
    filters: {
      timeframe: 'today',
      resolution: 'hourly'  
    }
  }

  componentDidMount () {
    console.log('mount window.location.search', window.location.search)
    if (window.location.search) {
      const query = window.location.search.substring(1)
      const initialFilters = query.split('&').map(q => q.split('=')).reduce((acc, k) => Object.assign(acc, {[k[0]]: decodeURIComponent(k[1])}), {})
      this.setState({ mounted: true, filters: Object.assign({}, this.state.filters, initialFilters) }, () => this.getData())
    } else {
      this.setState({ mounted: true }, () => this.getData())
    }
    setInterval(() => this.getLive(), 10 * 1000)
    setInterval(() => this.getData(), 60 * 1000)
  }

  async handleRoute(e) {
    console.log('handle route', e.url)
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
    this.setState({ data, loading: false })
  }

  async getLive () {
    if (this.state.loading) return
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/live')
    const live = await req.json()
    this.setState({ data: Object.assign({}, this.state.data, {live}) })
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
          toggleFilter: this.toggleFilter.bind(this),
          path: '/'
        }, [])
      ])
    ])
  }
}
