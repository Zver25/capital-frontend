import dayjs from 'dayjs';
import 'dayjs/locale/en';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AuthGuard from './components/AuthGuard';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import store from './store';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('en');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthGuard />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
