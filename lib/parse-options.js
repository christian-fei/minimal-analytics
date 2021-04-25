const path = require('path')

module.exports = function parseOptions (env) {
  const HTTP_PORT = +(env.HTTP_PORT || 8080)
  const DATA_PATH = env.DATA_PATH
    ? path.resolve(__dirname, '..', env.DATA_PATH)
    : path.resolve(__dirname, '..', 'data.ljson')
  const STATS_BASE_URL = env.STATS_BASE_URL
  const SITE_BASE_URL = env.SITE_BASE_URL

  if (!STATS_BASE_URL) throw new Error('MISSING_STATS_BASE_URL')
  if (!SITE_BASE_URL) throw new Error('MISSING_SITE_BASE_URL')

  return {
    HTTP_PORT,
    DATA_PATH,
    STATS_BASE_URL,
    SITE_BASE_URL
  }
}
