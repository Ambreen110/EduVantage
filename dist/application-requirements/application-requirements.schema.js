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
exports.ApplicationRequirementsSchema = exports.ApplicationRequirements = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApplicationRequirements = class ApplicationRequirements extends mongoose_2.Document {
};
exports.ApplicationRequirements = ApplicationRequirements;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ApplicationRequirements.prototype, "depositDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ApplicationRequirements.prototype, "offerLetterDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ApplicationRequirements.prototype, "otherRequirement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ApplicationRequirements.prototype, "academicRequirement", void 0);
exports.ApplicationRequirements = ApplicationRequirements = __decorate([
    (0, mongoose_1.Schema)()
], ApplicationRequirements);
exports.ApplicationRequirementsSchema = mongoose_1.SchemaFactory.createForClass(ApplicationRequirements);
//# sourceMappingURL=application-requirements.schema.js.map