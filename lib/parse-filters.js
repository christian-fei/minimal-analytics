import querystring from 'querystring'

const allowedFilters = ['p', 'r', 'v', 's']

export default function parseFilters (url = '') {
  let filters = {}
  if (url.indexOf('?') >= 0) {
    const qs = url.substring(url.indexOf('?') + 1)
    filters = querystring.parse(qs)
  }
  filters = Object.keys(filters)
    .filter(k => allowedFilters.includes(k))
    .reduce((acc, curr) =>
      Object.assign(acc, { [curr]: filters[curr] })
    , {})
  if (!filters.s) delete filters.s
  return filters
}
