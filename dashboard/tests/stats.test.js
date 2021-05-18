import { h } from '../modules/preact.js'
import Stats from '../components/stats'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('Stats', () => {
  test('renders empty stats', () => {
    const context = shallow(<Stats />)

    expect(context).toEqual({})
  })

  test('renders stats', () => {
    const context = shallow(<Stats data={{ live: {}, visitorsCount: 42, pageviewsCount: 50 }} />)

    expect(context.find('#visitors-count').text()).toEqual('42')
    expect(context.find('#pageviews-count').text()).toEqual('50')
    expect(context.find('#live').text()).toEqual('0')
    expect(context.find('#bounce-rate').text()).toEqual('84%')
    expect(context.find('#live-pages').text()).toEqual('')
  })

  test('renders live visitors', () => {
    const context = shallow(<Stats data={{ live: { 123: { pageview: { p: '/about', r: 'https://google.com' } } }, visitorsCount: 42, pageviewsCount: 50 }} />)

    expect(context.find('#visitors-count').text()).toEqual('42')
    expect(context.find('#pageviews-count').text()).toEqual('50')
    expect(context.find('#live').text()).toEqual('1')
    expect(context.find('#live-pages li').text()).toEqual('1 · /about')
    expect(context.find('#live-referrers li').text()).toEqual('1 · google.com')
  })
})
