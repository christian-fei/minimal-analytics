import path from 'path'
import { URL } from 'url'

export default function parseOptions (env) {
  const HTTP_PORT = +(env.HTTP_PORT || 8080)
  const DATA_PATH = env.DATA_PATH
    ? new URL(['..', env.DATA_PATH].join('/'), import.meta.url).pathname
    : new URL(['..', 'data', 'data.ljson'].join('/'), import.meta.url).pathname
  const STATS_BASE_URL = env.STATS_BASE_URL
  const SITE_BASE_URL = env.SITE_BASE_URL

  return {
    HTTP_PORT,
    DATA_PATH,
    STATS_BASE_URL,
    SITE_BASE_URL
  }
}
