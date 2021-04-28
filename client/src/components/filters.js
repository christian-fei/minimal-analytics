import { h } from 'preact'

export default function ({ updateTimeframe, updateResolution, filters }) {
  return (
    <div class='grid-lg contain'>
      <div class='w-50-lg'>
        <h4>Timeframe</h4>
        <div>
          <span onClick={() => updateTimeframe('today')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'today' && 'active'}`} name='today' id='today'>Today</span>
          <span onClick={() => updateTimeframe('past-day')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'past-day' && 'active'}`} name='past-day' id='past-day'>Past day</span>
          <span onClick={() => updateTimeframe('past-week')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'past-week' && 'active'}`} name='past-week' id='past-week'>Past week</span>
        </div>
        <div>
          <span onClick={() => updateTimeframe('past-month')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'past-month' && 'active'}`} name='past-month' id='past-month'>Past month</span>
          <span onClick={() => updateTimeframe('past-6-months')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'past-6-months' && 'active'}`} name='past-6-months' id='past-6-months'>Past 6 months</span>
          {/* <span onClick={() => updateTimeframe('past-year')} class={`select-timeframe filterable static-filter ${filters.timeframe === 'past-year' && 'active'}`} name='past-year' id='past-year'>Past year</span> */}
        </div>
      </div>
      <div class='w-50-lg'>
        <h4>Resolution</h4>
        {['past-year'].includes(filters.timeframe) && <span onClick={() => updateResolution('monthly')} class={`select-resolution filterable static-filter ${filters.resolution === 'monthly' && 'active'}`} name='monthly' id='monthly'>Monthly</span>}
        {['past-week', 'past-month', 'past-6-months', 'past-year'].includes(filters.timeframe) && <span onClick={() => updateResolution('daily')} class={`select-resolution filterable static-filter ${filters.resolution === 'daily' && 'active'}`} name='daily' id='daily'>Daily</span>}
        {['today', 'past-day', 'past-week', 'past-month'].includes(filters.timeframe) && <span onClick={() => updateResolution('hourly')} class={`select-resolution filterable static-filter ${filters.resolution === 'hourly' && 'active'}`} name='hourly' id='hourly'>Hourly</span>}
        {['today', 'past-day'].includes(filters.timeframe) && <span onClick={() => updateResolution('minutes')} class={`select-resolution filterable static-filter ${filters.resolution === 'minutes' && 'active'}`} name='minutes' id='minutes'>Minutes</span>}
      </div>
    </div>
  )
}
