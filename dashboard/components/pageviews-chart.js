import { h } from '../modules/preact.js'

export default function ({ data, filters = {}, updateCustomTimeframe }) {
  if (!data) return null
  if (!Array.isArray(data.chartData)) return null

  if (data.chartData.length < 2) {
    return h('div', {
      id: 'pageviews-chart',
      style: { 'text-align': 'center' }
    }, [
      'Insufficient data to show chart..',
      h('br', {}, []),
      'Try to change timeframe or resolution.'
    ])
  }

  const chartMaxPageviews = Math.max(...data.chartData.map(d => d[1]))
  return h('div', { id: 'pageviews-chart' }, [
    h('table', { class: 'charts-css column show-labels show-primary-axis' }, [
      h('thead', {}, [
        h('tr', {}, [
          h('th', { scope: 'col' }, 'Date'),
          h('th', { scope: 'col' }, 'Pageviews')
        ])
      ]),
      h('tbody', {}, data.chartData.map((d, i) =>
        h('tr', {
          key: d[0],
          onClick: () => updateCustomTimeframe(+new Date(d[0]))
        }, [
          h('td', {
            style: { '--start': i === 0 ? 0 : data.chartData[i - 1][1] / chartMaxPageviews, '--size': d[1] / chartMaxPageviews }
          }, [
            data.chartData.length < 50 && h('span', { class: 'data' }, d[1]),
            h('span', { class: 'tooltip' }, [
              formatDate(d[0], filters.resolution),
              h('br', {}, null),
              `${d[1]} pageviews`
            ])
          ].filter(Boolean))
        ])
      )
      )
    ])
  ])

  function formatDate (d, resolution) {
    if (resolution === 'daily' || resolution === 'monthly') return new Date(d).toLocaleDateString()
    return new Date(d).toLocaleString()
  }
}
