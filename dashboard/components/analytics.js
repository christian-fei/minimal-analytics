import { h, Component } from '../modules/preact.js'
import Filters from './filters.js'
import PageviewsChart from './pageviews-chart.js'
import Stats from './stats.js'
import Breakdown from './breakdown.js'
import History from './history.js'

export default class Analytics extends Component {
  render ({ data, filters, loading, updateResolution, updateTimeframe, toggleFilter } = {}) {
    if (Object.keys(data).length === 0) return null

    return h('div', { class: `${loading && 'loading'}` }, [
      h('div', { class: 'static' }, [
        h(PageviewsChart, {
          filters: filters,
          data: data
        }, []),
      ]),
      h(Filters, {
        updateResolution: updateResolution,
        updateTimeframe: updateTimeframe,
        filters: filters
      }, []),
      h(Stats, {
        toggleFilter: toggleFilter,
        filters: filters,
        data: data
      }, []),
      h(Breakdown, {
        data: data,
        filters: filters,
        toggleFilter: toggleFilter
      }, []),
      h(History, {
        data: data,
        filters: filters,
        toggleFilter: toggleFilter
      }, [])
    ])
  }
}
