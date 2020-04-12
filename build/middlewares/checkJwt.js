"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
exports.checkJwt = function (req, res, next) {
    //Se obtiene el tokenque llega en la cabecera
    //const token = <string>req.headers["auth"];
    var token = req.headers.auth;
    var jwtPayload;
    //Intenta validar el token y obtener datos
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        console.log("payload-", jwtPayload);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //Si el token no es válido, responda con 401 (no autorizado)
        //res.status(401).send();
        res.status(401).json({
            ok: false,
            mensaje: 'Token invalido'
        });
        return;
    }
    //El token es valido por una Hora
    //Queremos enviar un nuevo token en cada solicitud
    var userId = jwtPayload.userId, email = jwtPayload.email;
    var newToken = jwt.sign({ userId: userId, email: email }, config_1.default.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Llama al middleware o al controlador
    next();
};
//# sourceMappingURL=checkJwt.js.map