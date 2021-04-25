export default function ({ data }) {
  return (
    <div class='grid contain'>
      <div class='w-50'>
        <h2>Visitors</h2>
        <div id='visitors-count'>{data.visitorsCount}</div>
      </div>
      <div class='w-50'>
        <h2>Pageviews</h2>
        <div id='pageviews-count'>{data.pageviewsCount}</div>
      </div>
      <div class='w-50'>
        <h2>Live</h2>
        <div id='live'>{data.live}</div>
      </div>
    </div>
  )
}
