import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IProps {
    name: string;
    handler: (data: any) => void;
    blocking?: () => JSX.Element;
}

interface IState {
    data: any;
}

interface IChildContext {
    data: any;
}

export default class Event extends React.Component<IProps, IState> {
    public static readonly contextTypes = {
        socket: PropTypes.object.isRequired
    };

    public static readonly childContextTypes = {
        data: PropTypes.any
    };

    public readonly state: IState = {
        data: null
    };

    public constructor(props, context) {
        super(props, context);
    }

    public getChildContext(): IChildContext {
        return { data: this.state.data };
    }

    public componentDidMount(): void {
        this.context.socket.on(this.props.name, this._onData);
    }

    public componentWillUnmount(): void {
        this.context.socket.off(this.props.name, this._onData);
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                {(this.props.blocking && this.state.data === null)
                    ? this.props.blocking()
                    : this.props.children}
            </React.Fragment>
        );
    }

    private readonly _onData = data => {
        this.props.handler(data);
        this.setState({ data });
    }
}
