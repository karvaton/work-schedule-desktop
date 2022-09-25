import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setupStore from './state/store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import English from './lang/en.json';
import Ukrainian from './lang/uk.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();
const locale = localStorage.getItem('lang') || navigator.language;

let lang = English;
switch (locale) {
  case 'uk':
    lang = Ukrainian;
    break;

  default:
    break;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={locale} messages={lang}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
