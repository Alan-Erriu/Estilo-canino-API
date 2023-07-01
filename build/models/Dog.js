"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var dogSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
var _default = (0, _mongoose.model)("Dog", dogSchema);
exports["default"] = _default;