import { h } from '../modules/preact.js'

export default function ({ updateTimeframe, updateCustomTimeframe, clearCustomTimeframe, updateResolution, filters }) {
  return h('div', { class: 'grid-lg contain' }, [
    (!filters.from && !filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Timeframe'),
      h('div', {}, [
        h('span', {
          onClick: () => updateTimeframe('today'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'today' && 'active'}`,
          name: 'today',
          id: 'today'
        }, 'Today'),
        h('span', {
          onClick: () => updateTimeframe('past-day'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'past-day' && 'active'}`,
          name: 'past-day',
          id: 'past-day'
        }, 'Past day'),
        h('span', {
          onClick: () => updateTimeframe('past-week'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'past-week' && 'active'}`,
          name: 'past-week',
          id: 'past-week'
        }, 'Past week')
      ]),
      h('div', {}, [
        h('span', {
          onClick: () => updateTimeframe('past-month'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'past-month' && 'active'}`,
          name: 'past-month',
          id: 'past-month'
        }, 'Past month'),
        h('span', {
          onClick: () => updateTimeframe('past-6-months'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'past-6-months' && 'active'}`,
          name: 'past-6-months',
          id: 'past-6-months'
        }, 'Past 6 months'),
        h('span', {
          onClick: () => updateTimeframe('past-year'),
          class: `select-timeframe filterable static-filter ${filters.timeframe === 'past-year' && 'active'}`,
          name: 'past-year',
          id: 'past-year'
        }, 'Past Year'),
      ])
    ]),
    (!filters.from && !filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Resolution'),
      h('div', {}, [
        ['past-year'].includes(filters.timeframe) &&
          h('span', {
            onClick: () => updateResolution('monthly'),
            class: `select-resolution filterable static-filter ${filters.resolution === 'monthly' && 'active'}`,
            name: 'monthly',
            id: 'monthly'
          }, 'Monthly'),
        ['past-week', 'past-month', 'past-6-months', 'past-year'].includes(filters.timeframe) &&
            h('span', {
              onClick: () => updateResolution('daily'),
              class: `select-resolution filterable static-filter ${filters.resolution === 'daily' && 'active'}`,
              name: 'daily',
              id: 'daily'
            }, 'Daily'),
        ['today', 'past-day', 'past-week', 'past-month'].includes(filters.timeframe) &&
            h('span', {
              onClick: () => updateResolution('hourly'),
              class: `select-resolution filterable static-filter ${filters.resolution === 'hourly' && 'active'}`,
              name: 'hourly',
              id: 'hourly'
            }, 'Hourly'),
        ['today', 'past-day'].includes(filters.timeframe) &&
            h('span', {
              onClick: () => updateResolution('minutes'),
              class: `select-resolution filterable static-filter ${filters.resolution === 'minutes' && 'active'}`,
              name: 'minutes',
              id: 'minutes'
            }, 'Minutes')
      ].filter(Boolean))
    ]),
    (filters.from || filters.to) && h('div', { class: 'w-50-lg' }, [
      h('h4', {}, 'Resolution'),
      h('div', {}, [
        h('span', {
          onClick: () => updateResolution('daily'),
          class: `select-resolution filterable static-filter ${filters.resolution === 'daily' && 'active'}`,
          name: 'daily',
          id: 'daily'
        }, 'Daily'),
        h('span', {
          onClick: () => updateResolution('hourly'),
          class: `select-resolution filterable static-filter ${filters.resolution === 'hourly' && 'active'}`,
          name: 'hourly',
          id: 'hourly'
        }, 'Hourly')
      ])
    ]),
    filters.from && h('div', {}, [
      filters.from && h('span', { class: 'filterable static-filter' }, 'From '),
      filters.from && h('input', {
        type: 'datetime-local',
        onChange: e => {
          console.log(e.target.value)
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
          console.log(e.target.value)
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
}
