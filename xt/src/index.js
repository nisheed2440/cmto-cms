import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
OfflinePluginRuntime.install();
// registerServiceWorker();
