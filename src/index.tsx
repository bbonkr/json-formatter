import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { App } from './components/App';

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>,
    document.querySelector('#app'),
);
