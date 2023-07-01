"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;
var _mongoose = require("mongoose");
var roleSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var ROLES = ["cliente", "peluquero", "administrador"];
exports.ROLES = ROLES;
var _default = (0, _mongoose.model)("Role", roleSchema);
exports["default"] = _default;