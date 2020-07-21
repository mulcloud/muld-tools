import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

render(
    <React.Fragment>
        <App />
    </React.Fragment>,
    document.getElementById('app'),
);
