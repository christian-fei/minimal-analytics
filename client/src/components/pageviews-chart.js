export default function ({ data, resolution }) {
  const chartMaxPageviews = Math.max(...data.chartData.map(d => d[1]))

  if (data.chartData.length < 2) {
    return (
      <div id='pageviews-chart' style={{ 'text-align': 'center' }}>
        Insufficient data to show chart..
        <br />
        <br />
        :(
      </div>
    )
  }

  console.log('chartData.length', data.chartData.length)
  return (
    <div id='pageviews-chart'>
      <table class='charts-css column show-labels show-primary-axis'>
        <thead>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Pageviews</th>
          </tr>
        </thead>

        <tbody>
          {data.chartData.map((d, i) =>
            <tr key={d[0]}>
              <td style={{ '--start': i === 0 ? 0 : data.chartData[i - 1][1] / chartMaxPageviews, '--size': d[1] / chartMaxPageviews }}>
                {data.chartData.length < 25 &&
                  <span class='data'>{d[1]}</span>}
                <span class='tooltip'>
                  {formatDate(d[0], resolution)}<br />{d[1]} pageviews
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  function formatDate (d, resolution) {
    if (resolution === 'daily' || resolution === 'monthly') return new Date(d).toLocaleDateString()
    return new Date(d).toLocaleString()
  }
}
