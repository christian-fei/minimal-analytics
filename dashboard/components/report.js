import { h } from 'preact'
import { domainFromUrl } from '../lib/domain-from-url'

export default function ({ data, filters, loading }) {
  return h('div', { class: 'grid contain text-lg' }, [
    h('details', { class: `${loading && 'loading'}`, open: true }, [
      h('summary', { class: '', id: 'report' }, [
        h('span', {}, 'Textual report')
      ]),
      h('h1', { class: '' }, `Stats for timeframe: ${filters.timeframe || (`${filters.from && new Date(+filters.from).toISOString()} - ${(filters.to && new Date(+filters.to).toISOString()) || 'now'}`)}`),
      h('h2', { class: '' }, `${data.visitorsCount} visitors and ${data.pageviewsCount} pageviews`),
      h('h2', { class: '' }, `Resulting in a ${(data.visitorsCount / data.pageviewsCount * 100).toFixed(0) + '%'} bounce rate`),
      h('h2', { class: '' }, `Most traffic came from ${domainFromUrl(data.referrers[0].r)} (${data.referrers[0].views}, ~${Math.floor(data.referrers[0].views / data.pageviewsCount * 100)}%)`),
      h('h2', { class: '' }, 'The three most visited pages are'),
      h('ul', { class: '' }, [
        h('li', { class: '' }, `${data.pages[0].views} - ${data.pages[0].p}`),
        h('li', { class: '' }, `${data.pages[1].views} - ${data.pages[1].p}`),
        h('li', { class: '' }, `${data.pages[2].views} - ${data.pages[2].p}`)
      ])
    ])
  ])
}