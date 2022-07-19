import { h } from 'preact'

export default function ({ report, data, filters, loading }) {
  // if (!report) return null
  console.log(filters)

  return h('div', { class: 'grid contain text-lg' }, [
    h('details', { class: `${loading && 'loading'}`, open: true }, [
      h('summary', { class: '', id: 'report' }, [
        h('span', {}, 'Textual report')
      ]),
      h('h1', { class: '' }, `Stats for timeframe: ${filters.timeframe || (`${new Date(filters.from).toISOString()} - ${(filters.to && new Date(filters.to).toISOString()) || 'now'}`)}`),
      h('h2', { class: '' }, 'The five most visited pages are'),
      h('ul', { class: '' }, [
        h('li', { class: '' }, `${data.pages[0].views} - ${data.pages[0].p}`),
        h('li', { class: '' }, `${data.pages[1].views} - ${data.pages[1].p}`),
        h('li', { class: '' }, `${data.pages[2].views} - ${data.pages[2].p}`),
        h('li', { class: '' }, `${data.pages[3].views} - ${data.pages[3].p}`),
        h('li', { class: '' }, `${data.pages[4].views} - ${data.pages[4].p}`)
      ]),
      h('h2', { class: '' }, `Most traffic came from ${domain(data.referrers[0].r)} (${data.referrers[0].views}, ~${Math.floor(data.referrers[0].views / data.pageviewsCount * 100)}%)`)
    ])
  ])
}

function domain (url) {
  if (!url) return '/'
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}
