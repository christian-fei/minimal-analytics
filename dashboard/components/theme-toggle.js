import { h } from 'preact'

export default function ({ theme, toggleTheme = Function.prototype }) {
  return h('div', {class: 'theme-toggle', onClick: toggleTheme}, [
    `${theme === 'dark' ? 'light' : 'dark'} theme`
  ])
}
