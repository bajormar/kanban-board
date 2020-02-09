import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
