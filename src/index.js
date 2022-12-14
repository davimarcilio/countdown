import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import CountDown from './CountDown';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './features/storeRedux/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store} >
      <CountDown />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
