"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var dogCtrl = _interopRequireWildcard(require("../controllers/dog.controller"));
var _authjwt = require("../middlewares/authjwt");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();
//crea un nuevo perro
router.post("/", _authjwt.verifyToken, dogCtrl.createDog);
// obtener perro por id
router.get("/:dogId", _authjwt.verifyToken, dogCtrl.getDogById);
//obtener todos los perro relacionados al id de dueño por id guardado en token
router.get("/", _authjwt.verifyToken, dogCtrl.getDogsByOwnerId);
//obtener todos los perro relacionados al id de dueño por body
router.post("/alldog", _authjwt.verifyToken, dogCtrl.getDogsByOwnerIdBody);
// actualizar perro por id
router.put("/:dogId", _authjwt.verifyToken, dogCtrl.UpdateDogById);
//borrar perro por id
router["delete"]("/:dogId", _authjwt.verifyToken, dogCtrl.deleteDogById);
var _default = router;
exports["default"] = _default;