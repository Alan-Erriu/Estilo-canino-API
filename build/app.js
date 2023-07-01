"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _turn = _interopRequireDefault(require("./routes/turn.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _dog = _interopRequireDefault(require("./routes/dog.routes"));
var _initialSetup = require("./libs/initialSetup");
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
  credentials: true,
  origin: "*",
  preflightContinue: false
};
app.use((0, _cors["default"])(options));
// se crean los roles en la base de datos al inciar la aplicacion
(0, _initialSetup.createRoles)();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.json("welcolme to Estilo Canino");
});
app.use("/turn", _turn["default"]);
app.use("/auth", _auth["default"]);
app.use("/dog", _dog["default"]);
app.use("/user", _user["default"]);
var _default = app;
exports["default"] = _default;