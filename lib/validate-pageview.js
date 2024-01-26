const excludedDomains = [
  'github.dev',
  'devtunnels.ms',
  'vscode.dev',
  'visualstudio.com',
  'pages.dev'
]
const aYearAgo = +new Date() - 1000 * 60 * 60 * 24 * 365

export default function validatePageview (pageview, startDate = aYearAgo) {
  if (!pageview) return false
  if (!pageview.p) return false
  if (!pageview.d) return false
  if (!pageview.v) return false
  if (pageview.r && pageview.r.includes && excludedDomains.findIndex((d => pageview.r.includes(d))) >= 0) return false
  if (+new Date(pageview.d) < startDate) return false
  return true
}