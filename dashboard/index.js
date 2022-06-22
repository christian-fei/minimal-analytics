import { h, Component, render } from './modules/preact.js';
import htm from './modules/htm.js';

import App from './components/app.js'

const html = htm.bind(h);

render(html`<${App}/>`, document.body);
