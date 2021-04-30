import { h } from '../preact.js'

export default function ({ updateTimeframe, updateResolution, filters }) {
  return h('div', { class: 'grid-lg contain' }, [
    h('div', { class: 'w-50-lg' }, [
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
        }, 'Past 6 months')
      ])
    ]),
    h('div', { class: 'w-50-lg' }, [
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
    ])
  ])
}
