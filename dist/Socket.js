"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
var React = require("react");
var socketio = require("socket.io-client");
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Initializing"] = 0] = "Initializing";
    ConnectionState[ConnectionState["Connected"] = 1] = "Connected";
    ConnectionState[ConnectionState["Disconnected"] = 2] = "Disconnected";
    ConnectionState[ConnectionState["Reconnecting"] = 3] = "Reconnecting";
    ConnectionState[ConnectionState["Failure"] = 4] = "Failure";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var Socket = /** @class */ (function (_super) {
    __extends(Socket, _super);
    function Socket(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            state: ConnectionState.Initializing
        };
        _this._socket = socketio(_this.props.uri, __assign({}, Socket.defaultOptions, (_this.props.options || {})));
        _this._socket.on('connect', function () { return _this.setState({ state: ConnectionState.Connected }); });
        _this._socket.on('disconnect', function () { return _this.setState({ state: ConnectionState.Disconnected }); });
        _this._socket.on('error', function () { return _this.setState({ state: ConnectionState.Failure }); });
        _this._socket.on('reconnect', function () { return _this.setState({ state: ConnectionState.Connected }); });
        _this._socket.on('reconnecting', function () { return _this.setState({ state: ConnectionState.Reconnecting }); });
        _this._socket.on('reconnect_failed', function () { return _this.setState({ state: ConnectionState.Failure }); });
        return _this;
    }
    Socket.prototype.getChildContext = function () {
        return { socket: this._socket };
    };
    Socket.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.props.children));
    };
    Socket.childContextTypes = {
        socket: PropTypes.object
    };
    Socket.defaultOptions = {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1 * 1000,
        reconnectionDelayMax: 10 * 1000,
        rejectUnauthorized: true,
        transports: ['websocket', 'polling']
    };
    return Socket;
}(React.Component));
exports.default = Socket;
//# sourceMappingURL=Socket.js.map