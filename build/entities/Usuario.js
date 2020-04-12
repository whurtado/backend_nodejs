"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var bcrypt = require("bcryptjs");
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Usuario.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 6);
    };
    Usuario.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", String)
    ], Usuario.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(4, 100),
        __metadata("design:type", String)
    ], Usuario.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "estado", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Usuario.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Usuario.prototype, "updatedAt", void 0);
    Usuario = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(["email"])
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map