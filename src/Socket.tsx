import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as socketio from 'socket.io-client';

interface IProps {
    uri: string;
    options?: object;
}

interface IState {
    state: ConnectionState;
}

interface IChildContext {
    socket: socketio.Socket;
}

export enum ConnectionState {
    Initializing,
    Connected,
    Disconnected,
    Reconnecting,
    Failure
}

export default class Socket extends React.Component<IProps, IState> {
    public static readonly childContextTypes = {
        socket: PropTypes.object
    };

    public static readonly defaultOptions = {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1 * 1000,
        reconnectionDelayMax: 10 * 1000,
        rejectUnauthorized: true,
        transports: ['websocket', 'polling']
    };

    public readonly state: IState = {
        state: ConnectionState.Initializing
    };

    private readonly _socket: socketio.Socket;

    public constructor(props, context) {
        super(props, context);

        this._socket = socketio(this.props.uri, { ...Socket.defaultOptions, ...(this.props.options || {}) });
        this._socket.on('connect', () => this.setState({ state: ConnectionState.Connected }));
        this._socket.on('disconnect', () => this.setState({ state: ConnectionState.Disconnected }));
        this._socket.on('error', () => this.setState({ state: ConnectionState.Failure }));
        this._socket.on('reconnect', () => this.setState({ state: ConnectionState.Connected }));
        this._socket.on('reconnecting', () => this.setState({ state: ConnectionState.Reconnecting }));
        this._socket.on('reconnect_failed', () => this.setState({ state: ConnectionState.Failure }));
    }

    public getChildContext(): IChildContext {
        return { socket: this._socket };
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}
