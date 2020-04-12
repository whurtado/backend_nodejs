"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/Cliente.controller';
var ClienteController_1 = require("../controllers/ClienteController");
var router = express_1.Router();
//RUTAS CLIENTE
router.get('/', ClienteController_1.default.getClientes);
router.get('/:id', ClienteController_1.default.getCliente);
router.post('/', ClienteController_1.default.createCliente);
router.put('/:id', ClienteController_1.default.updateCliente);
router.delete('/:id', ClienteController_1.default.deleteCliente);
exports.default = router;
//# sourceMappingURL=cliente.js.map