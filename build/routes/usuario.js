"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var router = express_1.Router();
//RUTAS USUARIO
router.get('/', UserController_1.default.getUsuarios);
router.get('/:id', UserController_1.default.getUsuario);
router.post('/', UserController_1.default.createUsuario);
router.put('/:id', UserController_1.default.updateUsuario);
router.delete('/:id', UserController_1.default.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map