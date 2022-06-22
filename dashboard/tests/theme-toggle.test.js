import { h } from 'preact'
import ThemeToggle from '../components/theme-toggle'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

describe('ThemeToggle', () => {
  test('switches theme on click', () => {
    const state = {
      theme: 'light',
      toggleTheme: () => {
        state.theme = (state.theme === 'dark') ? 'light' : 'dark'
      }
    }
    const context = shallow(<ThemeToggle theme={state.theme} toggleTheme={state.toggleTheme} />)

    expect(state.theme).toEqual('light')
    expect(context.text()).toEqual('dark theme')
    context.simulate('click')
    expect(state.theme).toEqual('dark')
    // context.update()
    // expect(context.text()).toEqual('light theme')
  })
})
