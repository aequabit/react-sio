import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IProps {
    name: string;
    children: (data: any) => any;
}

interface IState {
    data: any;
}

export default class Event extends React.Component<IProps, IState> {
    public static readonly contextTypes = {
        socket: PropTypes.object.isRequired
    };

    public readonly state: IState = {
        data: null
    };

    public constructor(props, context) {
        super(props, context);
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
                {this.props.children(this.state.data)}
            </React.Fragment>
        );
    }

    private readonly _onData = data => {
        this.setState({ data });
    }
}
