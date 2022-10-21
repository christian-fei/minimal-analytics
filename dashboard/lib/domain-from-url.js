export function domainFromUrl (url) {
  if (!url) return '/'
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}
