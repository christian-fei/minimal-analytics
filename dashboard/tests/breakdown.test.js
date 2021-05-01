import { h } from '../modules/preact.js'
import Breakdown from '../components/breakdown'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('Breakdown', () => {
  test('renders empty breakdown', () => {
    const context = shallow(<Breakdown />)
    expect(context).toEqual({})
  })

  test('renders top referrers in breakdown', () => {
    const data = {
      referrers: [{ r: 'https://google.com', views: 42 }]
    }
    const context = shallow(<Breakdown data={data} />)
    expect(context.find('#referrers h2').text()).toBe('Top Referrers')
    expect(context.find('#referrers li').length).toBe(1)
  })

  test('renders top pages in breakdown', () => {
    const data = {
      pages: [{ p: '/about', views: 5 }]
    }
    const context = shallow(<Breakdown data={data} />)
    expect(context.find('#pages h2').text()).toBe('Top Pages')
    expect(context.find('#pages li').length).toBe(1)
  })
})
