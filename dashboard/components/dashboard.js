import { h, Component } from 'preact'
import Filters from './filters.js'
import ThemeToggle from './theme-toggle.js'
import Search from './search.js'
import PageviewsChart from './pageviews-chart.js'
import Stats from './stats.js'
import Breakdown from './breakdown.js'
import History from './history.js'

export default class Analytics extends Component {
  render ({ data, filters, loading, theme, searchTerm, updateResolution, updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, toggleFilter, toggleTheme, updateSearchTerm } = {}) {
    if (Object.keys(data).length === 0) return null
    return (
      <div className={`${loading && 'loading'}`}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Search searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
        <Filters
          filters={filters}
          clearCustomTimeframe={clearCustomTimeframe}
          updateResolution={updateResolution}
          updateTimeframe={updateTimeframe}
          updateCustomTimeframe={updateCustomTimeframe}
        />
        <PageviewsChart data={data} filters={filters} updateCustomTimeframe={updateCustomTimeframe} />
        <Stats data={data} filters={filters} toggleFilter={toggleFilter} />
        <Breakdown data={data} filters={filters} toggleFilter={toggleFilter} />
        <History data={data} filters={filters} toggleFilter={toggleFilter} />
      </div>
    )
  }
}