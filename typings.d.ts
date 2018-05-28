/// <reference types="react" />

declare module 'react-sio' {
    enum ConnectionState {
        Initializing,
        Connected,
        Disconnected,
        Reconnecting,
        Failure
    }

    interface ISocketProps {
        uri: string;
        options?: object;
    }

    interface ISocketState {
        state: ConnectionState;
    }

    class Socket extends React.Component<ISocketProps, ISocketState> { }

    interface IEventProps {
        name: string;
        handler: (data: any) => void;
    }

    class Event extends React.Component<IEventProps> { }
    
    export { Socket, Event };
}