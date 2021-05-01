import { h } from '../modules/preact.js'
import PageviewsChart from '../components/pageviews-chart'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('PageviewsChart', () => {
  test('renders empty chart', () => {
    const context = shallow(<PageviewsChart />)

    expect(context).toEqual({})
  })

  test('renders chart', () => {
    const data = {
      chartData: [
        ['2021-04-28T09:00:00.000Z', 25],
        ['2021-04-28T10:00:00.000Z', 15],
        ['2021-04-28T11:00:00.000Z', 10],
        ['2021-04-28T12:00:00.000Z', 42]
      ]
    }
    const context = shallow(<PageviewsChart data={data} />)

    expect(context.find('.charts-css').length).toEqual(1)
    expect(context.find('.charts-css td').length).toEqual(4)
  })
})
