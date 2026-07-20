import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';

import reportWebVitals from './reportWebVitals';
import App from './app/App';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Prerendered snapshots (see infra/vhconf.conf + the gen-old-home-prerender
// cron job) ship real markup inside #root. Hydrate onto it instead of
// blowing it away with createRoot().render(), or the visible content
// would flash: unmount the static snapshot, then rebuild it from scratch.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
