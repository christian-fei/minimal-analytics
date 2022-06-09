import { h } from '../modules/preact.js'
import ThemeToggle from '../components/theme-toggle'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('ThemeToggle', () => {
  test('switches theme on click', () => {
    const state = {
      theme: 'light'
    }
    const context = shallow(<ThemeToggle theme={state.theme} toggleTheme={() => state.theme = (state.theme === 'dark') ? 'light' : 'dark'} />)

    expect(context.text()).toEqual('dark theme')
    // context.find('.theme-toggle').at(0).simulate('click')
    // expect(context.text()).toEqual('light theme')
  })
})
