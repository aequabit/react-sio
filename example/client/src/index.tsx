import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Socket } from './../../../src/index';
import EventExample from './EventExample';
import BlockingEventExample from './BlockingEventExample';

ReactDOM.render(
    <Socket uri="http://127.0.0.1:8080">
        <EventExample />
        <BlockingEventExample />
    </Socket>, document.getElementById('app'));
