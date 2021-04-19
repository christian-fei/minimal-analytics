import { h, Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'

class Analytics extends Component {
  state = {
    data: {},
    timeframe: 'today',
    loading: false
  }
  async getData () {
    console.log('getting data', this.state.timeframe)
    this.setState({ loading: true })
    const query = ''
    const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
    const req = await window.fetch(host + '/api/' + this.state.timeframe + query)
    const data = await req.json()
    this.setState({ data, loading: false })
  }

  componentDidMount () {
    this.setState({
      data: {},
      timeframe: 'today',
      loading: false
    })
    this.getData()
  }

  updateTimeframe (timeframe) {
    console.log('setting', timeframe)
    this.setState({ timeframe }, () => this.getData())
  }

  render (props, { data, loading } = {}) {
    return (
      <div>
        <div class='grid-lg contain'>
          <div class='w-50-lg'>
            <h4>Timeframe</h4>
            <span onClick={() => this.updateTimeframe('today')} class='select-timeframe filterable' name='today' id='today'>Today</span>
            <span onClick={() => this.updateTimeframe('past-day')} class='select-timeframe filterable' name='past-day' id='past-day'>Past day</span>
            <span onClick={() => this.updateTimeframe('past-week')} class='select-timeframe filterable' name='past-week' id='past-week'>Past week</span>
            <span onClick={() => this.updateTimeframe('past-month')} class='select-timeframe filterable' name='past-month' id='past-month'>Past month</span>
          </div>
          <div class='w-50-lg'>
            <h4>Resolution</h4>
            <span class='select-resolution filterable' name='hourly' id='hourly'>Hourly</span>
            <span class='select-resolution filterable' name='daily' id='daily'>Daily</span>
            <span class='select-resolution filterable' name='minutes' id='minutes'>Minutes</span>
          </div>
        </div>

        <div class='grid contain'>
          <div class='w-50'>
            <h2>Visitors</h2>
            <div id='visitors-count'>{data && data.visitorsCount}</div>
          </div>
          <div class='w-50'>
            <h2>Pageviews</h2>
            <div id='pageviews-count'>{data && data.pageviewsCount}</div>
          </div>
          <div class='w-50'>
            <h2>Live</h2>
            <div id='live'>{data && data.live}</div>
          </div>
        </div>

        {data &&         
        <div class='grid-lg contain'>
          {data.referrers && 
          <div class='w-50-lg' id='referrers'>
            <h2>Top Referrers</h2>
            <ul id='top-referrers'>
              {data.referrers.map((d, i, referrers) => {
                const total = referrers.reduce((acc, curr) => Math.max(...[acc, curr.views]), 0)
                const favicon = `https://icons.duckduckgo.com/ip3/${domain(d.r)}.ico`
                const style = {
                  '--data-percentage': (100 - d.views * 80 / total) + '%'
                }
                return <li class="filterable" style={style}>
                  <b class="views">{d.views}</b> <img class="favicon" src={favicon}/>{d.r}
                </li>
              })}
            </ul>
          </div>
          }
          {data.pages && 
          <div class='w-50-lg' id='pages'>
            <h2>Top Pages</h2>
            <ul id='top-pages'>
            {data.pages.map((d, i, pages) => {
                const total = pages.reduce((acc, curr) => Math.max(...[acc, curr.views]), 0)
                const style = {
                  '--data-percentage': (100 - d.views * 80 / total) + '%'
                }
                return <li class="filterable" style={style}>
                  <b class="views">{d.views}</b> {d.p}
                </li>
              })}

            </ul>
          </div>
          }
        </div>
        }
      </div>
    )
  }
}

function domain (url) {
  if (!url) return '/'
  var a = document.createElement('a')
  a.href = url
  return a.hostname
}


// const Analytics = (options = {}) => {
//   const [timeframe, setTimeframe] = useState(options.timeframe || 'today')
//   const [data, setData] = useState({})
//   console.log({ timeframe })

//   // useEffect(() => {
//   //   const timer = setInterval(() => setTime(Date.now()), 1000)
//   //   return () => clearInterval(timer)
//   // }, [])
//   // useEffect(async () => {
//   //   const query = ''
//   //   const host = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin) ? 'http://127.0.0.1:8080' : window.location.origin
//   //   const last1h = await window.fetch(host + '/api/' + timeframe + query)
//   //   const json = await last1h.json()
//   //   setData(json)
//   //   console.log('data fetch', data)
//   //   return () => {
//   //     console.log('effect cb')
//   //   }
//   // })

//   console.log('data render', data)

//   return (
//     <div>
//       <div class='grid-lg contain'>
//         <div class='w-50-lg'>
//           <h4>Timeframe</h4>
//           <span onClick={() => setTimeframe(() => 'today')} class='select-timeframe filterable' name='today' id='today'>Today</span>
//           <span onClick={() => setTimeframe(() => 'past-day')} class='select-timeframe filterable' name='past-day' id='past-day'>Past day</span>
//           <span onClick={() => setTimeframe(() => 'past-week')} class='select-timeframe filterable' name='past-week' id='past-week'>Past week</span>
//           <span onClick={() => setTimeframe(() => 'past-month')} class='select-timeframe filterable' name='past-month' id='past-month'>Past month</span>
//         </div>
//         <div class='w-50-lg'>
//           <h4>Resolution</h4>
//           <span class='select-resolution filterable' name='hourly' id='hourly'>Hourly</span>
//           <span class='select-resolution filterable' name='daily' id='daily'>Daily</span>
//           <span class='select-resolution filterable' name='minutes' id='minutes'>Minutes</span>
//         </div>
//       </div>

//       <div class='grid contain'>
//         <div class='w-50'>
//           <h2>Visitors</h2>
//           <div id='visitors-count' />
//         </div>
//         <div class='w-50'>
//           <h2>Pageviews</h2>
//           <div id='pageviews-count' />
//         </div>
//         <div class='w-50'>
//           <h2>Live</h2>
//           <div id='live' />
//         </div>
//       </div>

//       <div class='grid-lg contain'>
//         <div class='w-50-lg' id='referrers'>
//           <h2>Top Referrers</h2>
//           <ul id='top-referrers' />
//         </div>
//         <div class='w-50-lg' id='pages'>
//           <h2>Top Pages</h2>
//           <ul id='top-pages' />
//         </div>
//       </div>
//     </div>
//   )
// }

export default Analytics

/*
<p>
  <button onClick={() => setCount((count) => count + 1)}>Click Me</button>
  {' '}
  Clicked {count} times.
</p>
*/
