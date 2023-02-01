import { h } from 'preact'

export default function ({ theme, toggleTheme = Function.prototype }) {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? 'light' : 'dark'} theme
    </div>
  )
}
