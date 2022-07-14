import test from 'ava'

import * as analytics from './analytics.js'

const testData = [
  { r: 'https://selfhosted.libhunt.com/', p: '/posts/2021-04-05-currently-self-hosting-apps/', w: 2133, type: 'pageview', v: '8455970640', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', d: '2021-04-14T09:26:09.220Z' },
  { r: 'https://www.google.com/', p: '/posts/2020-07-06-How-to-solve-Docker-Incompatible-CPU-detected/', w: 1920, type: 'pageview', v: 'c3074698a1', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', d: '2021-04-14T09:26:56.688Z' },
  { r: '', p: '/posts/2020-11-05-How-to-make-Polls-with-Plausible-Analytics/', w: 1862, type: 'pageview', v: '94337653fc', u: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-14T09:35:54.603Z' },
  { r: '', p: '/posts/2013-07-16-how-to-gzip-compression-of-css-and-js-files-on-s3-with-s3cmd/', w: 2560, type: 'pageview', v: 'd35185ae9c', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:87.0) Gecko/20100101 Firefox/87.0', d: '2021-04-14T09:37:29.999Z' },
  { r: 'https://www.ecosia.org/', p: '/posts/2020-05-10-Elixir-trick:-start-an-Observer-window-with-mix/', w: 2560, type: 'pageview', v: '9f6a7c6d4a', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-14T09:37:48.608Z' },
  { r: 'https://www.google.com.hk/', p: '/posts/2020-01-29-How-to-recover-from-failed-lerna-publish/', w: 1920, type: 'pageview', v: '759c1d27d7', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36', d: '2021-04-14T09:41:09.662Z' },
  { r: 'https://www.google.com/', p: '/posts/2020-03-07-Twitter-OAuth-Login-with-fastify-and-Node.js/', w: 1920, type: 'pageview', v: '3128e344d7', u: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0', d: '2021-04-14T09:55:00.450Z' },
  { r: 'https://www.bing.com/', p: '/posts/2021-04-13-switching-to-cloudflare-pages-first-impressions-review/', w: 1366, type: 'pageview', v: 'f05f8b7833', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', d: '2021-04-14T09:58:12.589Z' },
  { r: 'https://www.google.com/', p: '/posts/2020-07-06-Aggregations-with-sub-documents-in-MongoDB/', w: 751, type: 'pageview', v: '1c8ba2690c', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-14T09:58:36.019Z' }
]

test.serial('calculate pages breakdown', t => {
  t.deepEqual(analytics.calculatePagesBreakdown(testData), [{
    p: '/posts/2021-04-05-currently-self-hosting-apps/',
    views: 1
  }, {
    p: '/posts/2020-07-06-How-to-solve-Docker-Incompatible-CPU-detected/',
    views: 1
  }, {
    p: '/posts/2020-11-05-How-to-make-Polls-with-Plausible-Analytics/',
    views: 1
  }, {
    p: '/posts/2013-07-16-how-to-gzip-compression-of-css-and-js-files-on-s3-with-s3cmd/',
    views: 1
  }, {
    p: '/posts/2020-05-10-Elixir-trick:-start-an-Observer-window-with-mix/',
    views: 1
  }, {
    p: '/posts/2020-01-29-How-to-recover-from-failed-lerna-publish/',
    views: 1
  }, {
    p: '/posts/2020-03-07-Twitter-OAuth-Login-with-fastify-and-Node.js/',
    views: 1
  }, {
    p: '/posts/2021-04-13-switching-to-cloudflare-pages-first-impressions-review/',
    views: 1
  }, {
    p: '/posts/2020-07-06-Aggregations-with-sub-documents-in-MongoDB/',
    views: 1
  }])
})

test.serial('calculate referrers breakdown', t => {
  t.deepEqual(analytics.calculateReferrersBreakdown(testData), [{
    r: 'https://www.google.com/',
    views: 3
  }, {
    r: '',
    views: 2
  }, {
    r: 'https://selfhosted.libhunt.com/',
    views: 1
  }, {
    r: 'https://www.ecosia.org/',
    views: 1
  }, {
    r: 'https://www.google.com.hk/',
    views: 1
  }, {
    r: 'https://www.bing.com/',
    views: 1
  }])
})

test.serial('handles empty chart data', t => {
  t.deepEqual(analytics.calculateChartData([], 'minutes'), [])
  t.deepEqual(analytics.calculateChartData([], 'hourly'), [])
})

test.serial('calculate chart data (minutes)', t => {
  t.snapshot(analytics.calculateChartData([
    { r: 'https://www.google.com', p: '/posts/2020-03-02-First-steps-with-Darklang/', w: 1799, type: 'pageview', v: '337747a42a', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15', d: '2021-04-11T16:27:35.627Z' },
    { r: 'https://www.reddit.com/', p: '/posts/2021-04-05-currently-self-hosting-apps/', w: 1868, type: 'pageview', v: '3ec10ccc04', u: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:47:09.888Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-05-01-Optional-chaining-in-Node.js-14/', w: 1280, type: 'pageview', v: 'be5139267e', u: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:48:38.288Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/', w: 1896, type: 'pageview', v: 'e5b0e10680', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Safari/537.36', d: '2021-04-11T16:54:01.642Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-07-06-How-to-solve-Docker-docker-credential-desktop-not-installed-or-not-available-in-PATH/', w: 1408, type: 'pageview', v: '6471c3eb75', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:57:04.631Z' },
    { r: 'https://dev.to/', p: '/posts/', w: 1366, type: 'pageview', v: 'f7a6c5f488', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T17:07:33.019Z' }
  ], 'minutes', +new Date('2021-04-11T17:30:00.000Z')))
})

test.serial('calculate chart data (hourly)', t => {
  t.snapshot(analytics.calculateChartData([
    { r: 'https://www.google.com', p: '/posts/2020-03-02-First-steps-with-Darklang/', w: 1799, type: 'pageview', v: '337747a42a', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15', d: '2021-04-11T16:27:35.627Z' },
    { r: 'https://www.reddit.com/', p: '/posts/2021-04-05-currently-self-hosting-apps/', w: 1868, type: 'pageview', v: '3ec10ccc04', u: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:47:09.888Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-05-01-Optional-chaining-in-Node.js-14/', w: 1280, type: 'pageview', v: 'be5139267e', u: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:48:38.288Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/', w: 1896, type: 'pageview', v: 'e5b0e10680', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Safari/537.36', d: '2021-04-11T16:54:01.642Z' },
    { r: 'https://www.google.com/', p: '/posts/2020-07-06-How-to-solve-Docker-docker-credential-desktop-not-installed-or-not-available-in-PATH/', w: 1408, type: 'pageview', v: '6471c3eb75', u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T16:57:04.631Z' },
    { r: 'https://dev.to/', p: '/posts/', w: 1366, type: 'pageview', v: 'f7a6c5f488', u: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', d: '2021-04-11T17:07:33.019Z' }
  ], 'hourly', +new Date('2021-04-11T17:30:00.000Z')))
})
