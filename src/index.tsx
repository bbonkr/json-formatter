import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import JsonFomatter from './components/JsonFomatter';
import OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

const Hot = hot(JsonFomatter);

ReactDOM.render(<Hot />, document.querySelector('#app'));
