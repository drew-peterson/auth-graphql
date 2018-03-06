import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.axios = axios;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
