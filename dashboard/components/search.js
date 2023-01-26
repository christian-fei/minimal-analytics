import { h } from 'preact'

export default function ({ searchTerm = '', updateSearchTerm = Function.prototype } = { }) {
  return h('div', { class: 'contain' }, [
    h('input', {
      class: 'search',
      placeholder: 'Filter by page or referrer',
      onKeyUp: (e) => {
        console.log('changed', e.target.value)
        updateSearchTerm(e.target.value)
      }
    })
  ].filter(Boolean))
}
