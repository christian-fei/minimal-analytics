import { h } from 'preact'

export default function ({ updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, updateResolution, filters }) {
  return (
    <div className="grid-lg contain">
      {(!filters.from && !filters.to) && (
        <div className="w-50-lg">
          <h4>Timeframe</h4>
          <div>
            {timeframeSelection('today', 'Today')}
            {timeframeSelection('past-day', 'Past day')}
            {timeframeSelection('past-week', 'Past week')}
          </div>
          <div>
            {timeframeSelection('past-month', 'Past month')}
            {timeframeSelection('past-6-months', 'Past 6 months')}
            {timeframeSelection('past-year', 'Past year')}
          </div>
        </div>
      )}
      {(!filters.from && !filters.to) && (
        <div className="w-50-lg">
          <h4>Resolution</h4>
          <div>
            {['past-year', 'past-6-months'].includes(filters.timeframe) && resolutionSelection('monthly', 'Monthly')}
            {['past-week', 'past-month', 'past-6-months', 'past-year'].includes(filters.timeframe) && resolutionSelection('daily', 'Daily')}
            {['today', 'past-day', 'past-week', 'past-month', 'past-6-months'].includes(filters.timeframe) && resolutionSelection('hourly', 'Hourly')}
            {['today', 'past-day', 'past-week'].includes(filters.timeframe) && resolutionSelection('minutes', 'Minutes')}
          </div>
        </div>
      )}
      {filters.from && (
        <div>
          {filters.from && <span className="filterable static-filter">From </span>}
          {filters.from && (
            <input
              type="datetime-local"
              onChange={e => {
                updateCustomTimeframe(+new Date(e.target.value), +filters.to)
              }}
              value={new Date(+filters.from).toISOString().substring(0, 16)}
            />
          )}
        </div>
      )}
      {(filters.from && filters.to) && (
        <div>
          {filters.to && <span className="filterable static-filter">To </span>}
          {filters.to && (
            <input
              type="datetime-local"
              onChange={e => {
                updateCustomTimeframe(+filters.from, +new Date(e.target.value))
              }}
              value={new Date(+filters.to).toISOString().substring(0, 16)}
            />
          )}
        </div>
      )}
      {(filters.from || filters.to) && (
        <div
          className="filterable static-filter"
          onClick={() => clearCustomTimeframe()}
        >
          Clear [x]
        </div>
      )}
    </div>
  )
  function timeframeSelection(timeframe, label) {
    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); updateTimeframe(timeframe) }}
        className={`select-timeframe filterable static-filter ${filters.timeframe === timeframe && 'active'}`}
        name={timeframe}
        id={timeframe}
      >
        {label}
      </a>
    )
  }
  function resolutionSelection(resolution, label) {
    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); updateResolution(resolution) }}
        className={`select-resolution filterable static-filter ${filters.resolution === resolution && 'active'}`}
        name={resolution}
        id={resolution}
      >
        {label}
      </a>
    )
  }
}
