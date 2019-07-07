import React from 'React';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import JsonFomatter from './JsonFomatter';

const Hot = hot(JsonFomatter);

ReactDOM.render(<Hot />, document.querySelector('#app'));
