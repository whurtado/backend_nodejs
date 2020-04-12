"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var server_1 = require("./classes/server");
//import router from './routes';
var routes_1 = require("./routes");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var typeorm_1 = require("typeorm");
var server = new server_1.default();
//se inicia la conexion a la base de datos
typeorm_1.createConnection();
//morgan para evaluar las peticiones que llegan al api
server.app.use(morgan_1.default('dev'));
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
//server.app.use( cors({ origin: true, credentials: true  }) );
var corsOptions = {
    origin: "http://localhost:8081"
};
server.app.use(cors_1.default(corsOptions));
//se define el path dela aplicacion de donde se van a llamar las rutas
server.app.use('/api/', routes_1.default);
//llamado a las apis
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
//# sourceMappingURL=index.js.map