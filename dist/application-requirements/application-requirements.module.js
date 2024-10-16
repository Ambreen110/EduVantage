"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRequirementsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const application_requirements_schema_1 = require("./application-requirements.schema");
const application_requirements_service_1 = require("./application-requirements.service");
const application_requirements_controller_1 = require("./application-requirements.controller");
let ApplicationRequirementsModule = class ApplicationRequirementsModule {
};
exports.ApplicationRequirementsModule = ApplicationRequirementsModule;
exports.ApplicationRequirementsModule = ApplicationRequirementsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: application_requirements_schema_1.ApplicationRequirements.name, schema: application_requirements_schema_1.ApplicationRequirementsSchema }])],
        providers: [application_requirements_service_1.ApplicationRequirementsService],
        controllers: [application_requirements_controller_1.ApplicationRequirementsController],
    })
], ApplicationRequirementsModule);
//# sourceMappingURL=application-requirements.module.js.map