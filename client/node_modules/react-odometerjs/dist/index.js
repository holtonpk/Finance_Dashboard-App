'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _odometer = require('odometer');

var _odometer2 = _interopRequireDefault(_odometer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactOdometer = function (_PureComponent) {
  _inherits(ReactOdometer, _PureComponent);

  function ReactOdometer(props) {
    _classCallCheck(this, ReactOdometer);

    var _this = _possibleConstructorReturn(this, (ReactOdometer.__proto__ || Object.getPrototypeOf(ReactOdometer)).call(this, props));

    _this.node = _react2.default.createRef();
    return _this;
  }
  // Information about options can be found here:
  // http://github.hubspot.com/odometer/


  _createClass(ReactOdometer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          value = _props.value,
          options = _objectWithoutProperties(_props, ['value']);

      this.odometer = new _odometer2.default(_extends({
        el: this.node.current,
        value: value
      }, options));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var value = this.props.value;

      this.odometer.update(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        ref: this.node
      });
    }
  }]);

  return ReactOdometer;
}(_react.PureComponent);

exports.default = ReactOdometer;