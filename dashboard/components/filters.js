import { h } from 'preact'

export default function ({ updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, updateResolution, filters }) {
  return h('div', { class: 'grid-lg contain' }, [
    (!filters.from && !filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Timeframe'),
      h('div', {}, [
        timeframeSelection('today', 'Today'),
        timeframeSelection('past-day', 'Past day'),
        timeframeSelection('past-week', 'Past week')
      ]),
      h('div', {}, [
        timeframeSelection('past-month', 'Past month'),
        timeframeSelection('past-6-months', 'Past 6 months'),
        timeframeSelection('past-year', 'Past year')
      ])
    ]),
    (!filters.from && !filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Resolution'),
      h('div', {}, [
        ['past-year'].includes(filters.timeframe) &&
          resolutionSelection('monthly', 'Monthly'),
        ['past-week', 'past-month', 'past-6-months', 'past-year'].includes(filters.timeframe) &&
            resolutionSelection('daily', 'Daily'),
        ['today', 'past-day', 'past-week', 'past-month'].includes(filters.timeframe) &&
            resolutionSelection('hourly', 'Hourly'),
        ['today', 'past-day'].includes(filters.timeframe) &&
            resolutionSelection('minutes', 'Minutes')
      ].filter(Boolean))
    ]),
    (filters.from || filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Resolution'),
      h('div', {}, [
        resolutionSelection('daily', 'Daily'),
        resolutionSelection('hourly', 'Hourly')
      ])
    ]),
    filters.from && h('div', {}, [
      filters.from && h('span', { class: 'filterable static-filter' }, 'From '),
      filters.from && h('input', {
        type: 'datetime-local',
        onChange: e => {
          updateCustomTimeframe(+new Date(e.target.value), +filters.to)
        },
        value: new Date(+filters.from).toISOString().substring(0, 16)
      })
    ]),
    (filters.from && filters.to) && h('div', {}, [
      filters.to && h('span', { class: 'filterable static-filter' }, 'To '),
      filters.to && h('input', {
        type: 'datetime-local',
        onChange: e => {
          updateCustomTimeframe(+filters.from, +new Date(e.target.value))
        },
        value: new Date(+filters.to).toISOString().substring(0, 16)
      })
    ]),
    (filters.from || filters.to) && h('div', {
      class: 'filterable static-filter',
      onClick: () => clearCustomTimeframe()
    }, [
      'Clear [x]'
    ])
  ].filter(Boolean))

  function timeframeSelection (timeframe, label) {
    return h('span', {
      onClick: () => updateTimeframe(timeframe),
      class: `select-timeframe filterable static-filter ${filters.timeframe === timeframe && 'active'}`,
      name: timeframe,
      id: timeframe
    }, label)
  }
  function resolutionSelection (resolution, label) {
    return h('span', {
      onClick: () => updateResolution(resolution),
      class: `select-resolution filterable static-filter ${filters.resolution === resolution && 'active'}`,
      name: resolution,
      id: resolution
    }, label)
  }
}
