import { h } from 'preact'
import History from '../components/history'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('History', () => {
  test('renders empty history', () => {
    const context = shallow(<History />)

    expect(context).toEqual({})
  })

  test('renders history', () => {
    const data = {
      data: [
        {
          p: '/about',
          r: '',
          v: '123456',
          d: '2020-04-28T12:05:25.000Z'
        }
      ]
    }
    const context = shallow(<History data={data} />)

    expect(context.find('.pageview').length).toEqual(1)
  })
})
