"use strict";

var _app = _interopRequireDefault(require("./app"));
var _database = _interopRequireDefault(require("./database"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(3000);
(0, _database["default"])();
console.log("server on port ", 3000);