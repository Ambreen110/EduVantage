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
exports.ProgramSchema = exports.Program = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Program = class Program extends mongoose_2.Document {
};
exports.Program = Program;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Program.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed, default: {} }),
    __metadata("design:type", Object)
], Program.prototype, "englishLanguageTest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Yes', 'No', 'Not specified'], default: 'Not specified' }),
    __metadata("design:type", String)
], Program.prototype, "casInterview", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Program.prototype, "offerLetterDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Program.prototype, "initialDeposit", void 0);
exports.Program = Program = __decorate([
    (0, mongoose_1.Schema)()
], Program);
exports.ProgramSchema = mongoose_1.SchemaFactory.createForClass(Program);
//# sourceMappingURL=program.schema.js.map