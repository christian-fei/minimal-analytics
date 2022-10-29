import { h } from 'preact'
import Filters from '../components/filters'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('Filters', () => {
  test('renders default filters', () => {
    const context = shallow(<Filters filters={{}} />)

    expect(context.find('h4').at(0).text()).toEqual('Timeframe')
    expect(context.find('h4').at(1).text()).toEqual('Resolution')

    expect(context.find('#today').text()).toEqual('Today')
    expect(context.find('#past-day').text()).toEqual('Past day')
    expect(context.find('#past-week').text()).toEqual('Past week')
    expect(context.find('#past-month').text()).toEqual('Past month')
    expect(context.find('#past-6-months').text()).toEqual('Past 6 months')
    expect(context.find('#past-year').text()).toEqual('Past year')
  })

  test('renders custom filters', () => {
    const context = shallow(<Filters filters={{ timeframe: 'today' }} />)

    expect(context.find('h4').at(0).text()).toEqual('Timeframe')
    expect(context.find('h4').at(1).text()).toEqual('Resolution')

    expect(context.find('#today').text()).toEqual('Today')
    expect(context.find('#today').hasClass('active')).toEqual(true)
    expect(context.find('#past-day').text()).toEqual('Past day')
    expect(context.find('#past-week').text()).toEqual('Past week')
    expect(context.find('#past-month').text()).toEqual('Past month')
    expect(context.find('#past-6-months').text()).toEqual('Past 6 months')
    expect(context.find('#past-year').text()).toEqual('Past year')

    expect(context.find('#hourly').text()).toEqual('Hourly')
    expect(context.find('#minutes').text()).toEqual('Minutes')
    expect(context.find('#daily')).toEqual({})
    expect(context.find('#monthly')).toEqual({})
  })

  test('renders correct resolution based on timeframe', () => {
    let context = shallow(<Filters filters={{ timeframe: 'past-day' }} />)

    expect(context.find('#hourly').text()).toEqual('Hourly')
    expect(context.find('#minutes').text()).toEqual('Minutes')
    expect(context.find('#daily')).toEqual({})
    expect(context.find('#monthly')).toEqual({})

    context = shallow(<Filters filters={{ timeframe: 'past-week' }} />)

    expect(context.find('#hourly').text()).toEqual('Hourly')
    expect(context.find('#minutes')).toEqual({})
    expect(context.find('#daily').text()).toEqual('Daily')
    expect(context.find('#monthly')).toEqual({})

    context = shallow(<Filters filters={{ timeframe: 'past-month' }} />)

    expect(context.find('#minutes')).toEqual({})
    expect(context.find('#hourly').text()).toEqual('Hourly')
    expect(context.find('#daily').text()).toEqual('Daily')
    expect(context.find('#monthly')).toEqual({})

    context = shallow(<Filters filters={{ timeframe: 'past-6-months' }} />)

    expect(context.find('#minutes')).toEqual({})
    expect(context.find('#hourly').text()).toEqual('Hourly')
    expect(context.find('#daily').text()).toEqual('Daily')
    expect(context.find('#monthly').text()).toEqual('Monthly')

    context = shallow(<Filters filters={{ timeframe: 'past-year' }} />)

    expect(context.find('#hourly')).toEqual({})
    expect(context.find('#minutes')).toEqual({})
    expect(context.find('#daily').text()).toEqual('Daily')
    expect(context.find('#monthly').text()).toEqual('Monthly')
  })
})
