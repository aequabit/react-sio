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
var Event_1 = require("./Event");
var BlockingEvent = /** @class */ (function (_super) {
    __extends(BlockingEvent, _super);
    function BlockingEvent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            data: null
        };
        return _this;
    }
    BlockingEvent.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(Event_1.default, { name: this.props.name, handler: function (data) {
                    _this.setState({ data: data });
                    _this.props.handler(data);
                } }),
            this.state.data === null
                ? this.props.waiting()
                : this.props.children));
    };
    BlockingEvent.contextTypes = {
        socket: PropTypes.object.isRequired
    };
    return BlockingEvent;
}(React.Component));
exports.default = BlockingEvent;
//# sourceMappingURL=BlockingEvent.js.map