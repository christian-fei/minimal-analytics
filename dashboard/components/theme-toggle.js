import { h } from '../modules/preact.js'

export default function ({ theme, toggleTheme = Function.prototype }) {
  return h('div', {class: 'theme-toggle', onClick: toggleTheme}, [
    `${theme === 'dark' ? 'light' : 'dark'} theme`
  ])
}
