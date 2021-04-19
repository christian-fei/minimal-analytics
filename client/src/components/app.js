import { h } from 'preact'
import { Router } from 'preact-router'

import Analytics from '../routes/analytics'

const App = () => (
  <div id='app'>
    <Router>
      <Analytics path='/' />
      <Analytics path='/:timeframe' />
    </Router>
  </div>
)

export default App
