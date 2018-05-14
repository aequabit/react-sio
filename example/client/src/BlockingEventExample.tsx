import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Event } from './../../../src/index';

interface IState {
    data: any;
}

export default class BlockingEventExample extends React.Component<{}, IState> {
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
            <Event name="test" handler={data => this.setState({ data })} blocking={() => <p>loading...</p>}>
                <pre>{JSON.stringify(this.state.data)}</pre>
            </Event>
        );
    }
}
