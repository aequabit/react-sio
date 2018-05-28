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
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
var React = require("react");
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._onData = function (data) { return _this.props.handler(data); };
        return _this;
    }
    Event.prototype.componentDidMount = function () {
        this.context.socket.on(this.props.name, this._onData);
    };
    Event.prototype.componentWillUnmount = function () {
        this.context.socket.off(this.props.name, this._onData);
    };
    Event.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.props.children));
    };
    Event.contextTypes = {
        socket: PropTypes.object.isRequired
    };
    return Event;
}(React.Component));
exports.default = Event;
//# sourceMappingURL=Event.js.map