import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ToastContainer} from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
