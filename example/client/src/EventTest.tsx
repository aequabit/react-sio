import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Event } from './../../../src/index';

interface IState {
    data: any;
}

export default class EventTet extends React.Component<{}, IState> {
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
        this.context.socket.emit('test');
    }

    public render() {
        return (
            <Event name="test">
                {data => this._render(data)}
            </Event>
        );
    }

    private _render(data) {
        if (data === null)
            return <h3>loading...</h3>;

        return <pre>{JSON.stringify(data)}</pre>;
    }
}
