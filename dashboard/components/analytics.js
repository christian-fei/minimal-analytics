import { h, Component } from 'preact'
import Filters from './filters.js'
import ThemeToggle from './theme-toggle.js'
import PageviewsChart from './pageviews-chart.js'
import Stats from './stats.js'
import Breakdown from './breakdown.js'
import History from './history.js'

export default class Analytics extends Component {
  render ({ data, filters, loading, theme, updateResolution, updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, toggleFilter, toggleTheme } = {}) {
    if (Object.keys(data).length === 0) return null
    return h('div', { class: `${loading && 'loading'}` }, [
      h(ThemeToggle, {
        theme: theme,
        toggleTheme: toggleTheme
      }, []),
      h(Filters, {
        updateResolution: updateResolution,
        updateTimeframe: updateTimeframe,
        updateCustomTimeframe: updateCustomTimeframe,
        clearCustomTimeframe: clearCustomTimeframe,
        filters: filters
      }, []),
      h(PageviewsChart, {
        filters: filters,
        data: data,
        updateCustomTimeframe: updateCustomTimeframe
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
    ].filter(Boolean))
  }
}
