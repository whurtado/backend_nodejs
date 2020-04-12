"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var environment_1 = require("../global/environment");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
    }
    //metodo para levantar el servidor
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map