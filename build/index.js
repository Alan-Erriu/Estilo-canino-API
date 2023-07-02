"use strict";

var _app = _interopRequireDefault(require("./app"));
var _dataBase = _interopRequireDefault(require("./database"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
(0, _dataBase["default"])();
var PORT = 3000;
_app["default"].listen(PORT, function () {
  console.log("Server is running on port", PORT);
});
