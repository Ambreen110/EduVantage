"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScholarshipsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const scholarships_controller_1 = require("./scholarships.controller");
const scholarships_service_1 = require("./scholarships.service");
const scholarship_schema_1 = require("./scholarship.schema");
let ScholarshipsModule = class ScholarshipsModule {
};
exports.ScholarshipsModule = ScholarshipsModule;
exports.ScholarshipsModule = ScholarshipsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: scholarship_schema_1.Scholarship.name, schema: scholarship_schema_1.ScholarshipSchema }])
        ],
        controllers: [scholarships_controller_1.ScholarshipsController],
        providers: [scholarships_service_1.ScholarshipsService],
    })
], ScholarshipsModule);
//# sourceMappingURL=scholarships.module.js.map