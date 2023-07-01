"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableTurnsByDate = exports.getAppointmentsByGroomerAndDate = exports.getAppointmentsByDogId = exports.getAppointmentsByClientId = exports.getAllTurns = exports.deleteTurnById = exports.createTurnByClient = void 0;
var _Turn = _interopRequireDefault(require("../models/Turn.js"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// el cliente crea un nuevo turno-------------------------
var createTurnByClient = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, date, month, year, day, time, groomer, dog, client, selectedDateTime, currentDateTime, existingTurns, previousTurn, previousTime, currentTime, minTimeDiff, turn, savedTurn;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, date = _req$body.date, month = _req$body.month, year = _req$body.year, day = _req$body.day, time = _req$body.time, groomer = _req$body.groomer, dog = _req$body.dog, client = _req$body.client; //convierte los inputs del usario a un formato que la librerìa moment entienda YYYY-MM-DD HH:mm
          selectedDateTime = (0, _moment["default"])("".concat(year, "-").concat(month, "-").concat(date, " ").concat(time)); //consulta el momento actual  ej:2023-06-27 10:00
          currentDateTime = (0, _moment["default"])(); //pregunta si la fecha ingresada por el usuario es valida
          if (selectedDateTime.isValid()) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Invalid date and time"
          }));
        case 6:
          if (!selectedDateTime.isBefore(currentDateTime)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Selected date and time is in the past"
          }));
        case 8:
          _context.next = 10;
          return _Turn["default"].find({
            date: date,
            month: month,
            year: year,
            day: day,
            time: time,
            groomer: groomer,
            dog: dog
          });
        case 10:
          existingTurns = _context.sent;
          if (!(existingTurns.length > 0)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Turn already exists for the given date and time"
          }));
        case 13:
          _context.next = 15;
          return _Turn["default"].findOne({
            day: day,
            time: {
              $lt: time
            },
            groomer: groomer
          }).sort({
            time: -1
          });
        case 15:
          previousTurn = _context.sent;
          if (!previousTurn) {
            _context.next = 24;
            break;
          }
          // Calcular la diferencia de tiempo entre el turno anterior y el turno deseado
          previousTime = parseInt(previousTurn.time.replace(":", ""));
          currentTime = parseInt(time.replace(":", ""));
          minTimeDiff = 100; // 1 hora en formato HH:mm (por ejemplo, 09:00)
          if (!(previousTime >= currentTime)) {
            _context.next = 22;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Cannot schedule a turn within 1 hour of the previous turn"
          }));
        case 22:
          if (!(previousTime + minTimeDiff > currentTime)) {
            _context.next = 24;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Cannot schedule a turn within 1 hour of the previous turn"
          }));
        case 24:
          turn = new _Turn["default"]({
            date: date,
            month: month,
            year: year,
            day: day,
            time: time,
            groomer: groomer,
            dog: dog,
            client: client,
            availability: false
          });
          _context.next = 27;
          return turn.save();
        case 27:
          savedTurn = _context.sent;
          return _context.abrupt("return", res.status(200).json(savedTurn));
        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Error creating turn"
          }));
        case 35:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 31]]);
  }));
  return function createTurnByClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createTurnByClient = createTurnByClient;
var getAvailableTurnsByDate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, date, month, year, day, groomerId, appointments, allSlots, reservedSlots, availableSlots, currentTime;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, date = _req$body2.date, month = _req$body2.month, year = _req$body2.year, day = _req$body2.day, groomerId = _req$body2.groomerId;
          console.log(date, month, year, day, groomerId);
          // Realizar una consulta para obtener las citas reservadas para el día y el peluquero específico
          _context2.next = 5;
          return _Turn["default"].find({
            date: date,
            month: month,
            year: year,
            day: day,
            groomer: groomerId
          });
        case 5:
          appointments = _context2.sent;
          // Generar una lista de horarios disponibles para el día seleccionado
          allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]; // Eliminar los horarios que ya están reservados
          reservedSlots = appointments.map(function (appointment) {
            return appointment.time;
          });
          availableSlots = allSlots.filter(function (slot) {
            return !reservedSlots.includes(slot);
          }); // Obtener la hora actual
          currentTime = (0, _moment["default"])(); // Retornar los horarios disponibles al cliente
          return _context2.abrupt("return", res.status(200).json({
            availableSlots: availableSlots
          }));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error getting available turns"
          }));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getAvailableTurnsByDate(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
// trae todos los turnos ordenados de menor a mayor (fecha)
exports.getAvailableTurnsByDate = getAvailableTurnsByDate;
var getAllTurns = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var turns;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Turn["default"].find().sort({
            year: 1,
            month: 1,
            date: 1
          });
        case 3:
          turns = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(turns));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error getting turns"
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllTurns(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
//
exports.getAllTurns = getAllTurns;
var getAppointmentsByGroomerAndDate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, groomerId, date, month, year, appointments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, groomerId = _req$body3.groomerId, date = _req$body3.date, month = _req$body3.month, year = _req$body3.year; // Busca los turnos en la base de datos para el peluquero y fecha especificados
          _context4.next = 4;
          return _Turn["default"].find({
            groomer: groomerId,
            date: date,
            month: month,
            year: year
          }).populate("dog", "name").populate("client", "name").populate("groomer", "name");
        case 4:
          appointments = _context4.sent;
          res.json(appointments);
          _context4.next = 12;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error al obtener los turnos:", _context4.t0);
          res.status(500).json({
            error: "Error al obtener los turnos"
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getAppointmentsByGroomerAndDate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
// todos los turnos por  cliente especifico
exports.getAppointmentsByGroomerAndDate = getAppointmentsByGroomerAndDate;
var getAppointmentsByClientId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var clientId, appointments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          clientId = req.body.clientId; // Busca los turnos en la base de datos para el peluquero y fecha especificados
          _context5.next = 4;
          return _Turn["default"].find({
            client: clientId
          }).populate("dog", "name").populate("client", "name").populate("groomer", "name");
        case 4:
          appointments = _context5.sent;
          res.json(appointments);
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error("Error al obtener los turnos:", _context5.t0);
          res.status(500).json({
            error: "Error al obtener los turnos"
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getAppointmentsByClientId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
//todos los turnos por  perro especifico
exports.getAppointmentsByClientId = getAppointmentsByClientId;
var getAppointmentsByDogId = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var dogId, appointments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          dogId = req.body.dogId; // Busca los turnos en la base de datos para el peluquero y fecha especificados
          _context6.next = 4;
          return _Turn["default"].find({
            dog: dogId
          }).populate("dog", "name").populate("client", "name").populate("groomer", "name");
        case 4:
          appointments = _context6.sent;
          res.json(appointments);
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error("Error al obtener los turnos:", _context6.t0);
          res.status(500).json({
            error: "Error al obtener los turnos"
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getAppointmentsByDogId(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//borrar un turno por id
exports.getAppointmentsByDogId = getAppointmentsByDogId;
var deleteTurnById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _id, deletedTurn;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _id = req.params._id; // Buscar y eliminar el turno por su ID
          _context7.next = 4;
          return _Turn["default"].findByIdAndDelete(_id);
        case 4:
          deletedTurn = _context7.sent;
          if (deletedTurn) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Turn not found"
          }));
        case 7:
          return _context7.abrupt("return", res.status(200).json({
            message: "Turn deleted successfully"
          }));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error("Error deleting turn:", _context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            message: "Error deleting turn"
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function deleteTurnById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteTurnById = deleteTurnById;