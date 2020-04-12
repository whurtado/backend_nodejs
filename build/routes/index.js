"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
//import rutas from "./router";
var cliente_1 = require("./cliente");
var usuario_1 = require("./usuario");
var routes = express_1.Router();
//routes.use("/router", rutas);
routes.use("/auth", auth_1.default);
routes.use("/customer", cliente_1.default);
routes.use("/user", usuario_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map