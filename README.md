# react-sio - Socket.io Wrapper for React

## Installation:
`$ npm i react-sio`

## Usage:

`index.tsx`
```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Socket } from 'react-sio';

import App from './App';

ReactDOM.render(
    <Socket uri="http://example.org">
        <App />
    </Socket>, document.getElementById('app'));

```

`App.tsx`
```tsx
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Event } from 'react-sio';

interface IState {
    data: any;
}

export default class App extends React.Component<{}, IState> {
    public static readonly contextTypes = {
        socket: PropTypes.object.isRequired
    };

    public readonly state: IState = {
        data: null
    };

    public constructor(props, context) {
        super(props, context);
    }

    public componentDidMount() {
        this.context.socket.emit('myEvent', { foo: 1, bar: 2, baz: 3 });
    }

    public render() {
        <Event name="myEvent">
            {data => <p>{data || 'loading...'}</p>}
        </Event>
    }
}
```
