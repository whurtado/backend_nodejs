"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Usuario_1 = require("../entities/Usuario");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getUsuarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userRepository, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
                    return [4 /*yield*/, userRepository.find({
                            select: ["id", "nombre", "email", "estado"]
                        })];
                case 1:
                    users = _a.sent();
                    //Retorna Un Objeto de usuarios
                    res.send(users);
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.getUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, userRepository, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id, {
                            select: ["id", "nombre", "email", "estado"]
                        })];
                case 2:
                    user = _a.sent();
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(404).send("Usuario con id " + id + " no encontrado");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.createUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, nombre, email, password, estado, user, errors, userRepository, results, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, nombre = _a.nombre, email = _a.email, password = _a.password, estado = _a.estado;
                    user = new Usuario_1.Usuario();
                    user.nombre = nombre;
                    user.email = email;
                    user.password = password;
                    user.estado = estado;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return [2 /*return*/];
                    }
                    //Hash the password, to securely store on DB
                    user.hashPassword();
                    userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    results = _b.sent();
                    //Si todo esta bien, responde 201
                    res.status(201).json({
                        ok: true,
                        mensaje: "Usuario Creado Correctamente",
                        usuario: results
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    res.status(409).send("username already in use");
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    /*static createUsuario = async (req: Request,res: Response): Promise<Response> => {
    const newUsuario = await getRepository(Usuario).create(req.body);
    const results = await getRepository(Usuario).save(newUsuario);
    return res.json(results);
    };*/
    UserController.updateUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, email, estado, userRepository, user, error_2, errors, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, email = _a.email, estado = _a.estado;
                    userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    //Si ni encuentra al usuario, responde 404
                    res.status(404).send("User not found");
                    return [2 /*return*/];
                case 4:
                    //Validad los nuevos valores a guardar
                    user.email = email;
                    user.estado = estado;
                    return [4 /*yield*/, class_validator_1.validate(user)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return [2 /*return*/];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    res.status(409).send("El Email que intenta guardar ya esta en usos");
                    return [2 /*return*/];
                case 9:
                    //Despues de Todo envia una respuesta 204
                    res.status(204).send();
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.deleteUsuario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, userRepository, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = typeorm_1.getRepository(Usuario_1.Usuario);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(404).send("Usuario no encontrado");
                    return [2 /*return*/];
                case 4:
                    userRepository.delete(id);
                    //After all send a 204 (no content, but accepted) response
                    res.status(204).send();
                    return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map