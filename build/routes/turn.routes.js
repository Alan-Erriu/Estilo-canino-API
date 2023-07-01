"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var turnsCtrl = _interopRequireWildcard(require("../controllers/turn.controller"));
var _authjwt = require("../middlewares/authjwt");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();

//obtener un turno por id de turno-------------------------------------------------
router.post("/", _authjwt.verifyToken, turnsCtrl.getAvailableTurnsByDate);
//el cliente solicita un nuevo turno---------------------------------------
router.post("/create", _authjwt.verifyToken, turnsCtrl.createTurnByClient);
//obtener todos los turnos por fecha de menor a mayor (fecha)
router.get("/turns", _authjwt.verifyToken, turnsCtrl.getAllTurns);
//traer todos los turnos por fecha y peluquero especifico
router.post("/alls", _authjwt.verifyToken, turnsCtrl.getAppointmentsByGroomerAndDate);
//traer todos los turnos por id de cliente especifico
router.post("/allclient", _authjwt.verifyToken, turnsCtrl.getAppointmentsByClientId);
//traer todos los turnos por perro id especifico
router.post("/alldog", _authjwt.verifyToken, turnsCtrl.getAppointmentsByDogId);
//borar un turno por id
router["delete"]("/:_id", _authjwt.verifyToken, turnsCtrl.deleteTurnById);
var _default = router;
exports["default"] = _default;