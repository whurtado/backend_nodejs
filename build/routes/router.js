"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Cliente_controller_1 = require("../controllers/Cliente.controller");
var Usuario_controller_1 = require("../controllers/Usuario.controller");
var router = express_1.Router();
router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});
router.post('/mensajes', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });
});
router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
//RUTAS USUARIO
router.get('/user', Usuario_controller_1.getUsuarios);
router.get('/user/:id', Usuario_controller_1.getUsuario);
router.post('/user', Usuario_controller_1.createUsuario);
router.put('/user/:id', Usuario_controller_1.updateUsuario);
router.delete('/user/:id', Usuario_controller_1.deleteUsuario);
//RUTAS CLIENTE
router.get('/customer', Cliente_controller_1.getClientes);
router.get('/customer/:id', Cliente_controller_1.getCliente);
router.post('/customer', Cliente_controller_1.createCliente);
router.put('/customer/:id', Cliente_controller_1.updateCliente);
router.delete('/customer/:id', Cliente_controller_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=router.js.map