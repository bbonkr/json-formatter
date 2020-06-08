import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import JsonFomatter from './components/JsonFomatter';

const Hot = hot(JsonFomatter);

ReactDOM.render(<Hot />, document.querySelector('#app'));
