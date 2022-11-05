import { h, Component } from 'preact'
import Filters from './filters.js'
import ThemeToggle from './theme-toggle.js'
import PageviewsChart from './pageviews-chart.js'
import Stats from './stats.js'
import Breakdown from './breakdown.js'
import History from './history.js'
import Report from './report.js'

export default class Analytics extends Component {
  render ({ data, filters, loading, theme, report, updateResolution, updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, toggleFilter, toggleTheme } = {}) {
    if (Object.keys(data).length === 0) return null
    return h('div', { class: `${loading && 'loading'}` }, [
      h(ThemeToggle, {
        theme,
        toggleTheme
      }, []),
      h(Report, {
        data,
        report,
        filters
      }, []),
      h(Filters, {
        filters,
        clearCustomTimeframe,
        updateResolution,
        updateTimeframe,
        updateCustomTimeframe
      }, []),
      h(PageviewsChart, {
        data,
        filters,
        updateCustomTimeframe
      }, []),
      h(Stats, {
        data,
        filters,
        toggleFilter
      }, []),
      h(Breakdown, {
        data,
        filters,
        toggleFilter
      }, []),
      h(History, {
        data,
        filters,
        toggleFilter
      }, [])
    ].filter(Boolean))
  }
}

