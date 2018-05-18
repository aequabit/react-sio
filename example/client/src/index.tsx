import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Socket } from './../../../src/index';
import EventTest from './EventTest';

ReactDOM.render(
    <Socket uri="http://127.0.0.1:8080">
        <EventTest />
    </Socket>, document.getElementById('app'));
