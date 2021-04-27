import { h, Component } from 'preact'
import Filters from '../../components/filters'
import PageviewsChart from '../../components/pageviews-chart'
import Stats from '../../components/stats'
import Breakdown from '../../components/breakdown'
import History from '../../components/history'

export default class Analytics extends Component {
  render ({ data, filters, loading, updateResolution, updateTimeframe, toggleFilter } = {}) {
    if (Object.keys(data).length === 0) return null

    return (
      <div class={`${loading && 'loading'}`}>
        <Filters
          updateResolution={updateResolution}
          updateTimeframe={updateTimeframe}
          filters={filters}
        />

        <PageviewsChart
          filters={filters}
          data={data}
        />

        <Stats
          toggleFilter={toggleFilter}
          data={data}
        />

        <Breakdown
          data={data}
          filters={filters}
          toggleFilter={toggleFilter}
        />

        <History
          data={data}
          filters={filters}
          toggleFilter={toggleFilter}
        />

      </div>
    )
  }
}
