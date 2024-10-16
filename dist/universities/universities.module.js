"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversitiesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const universities_service_1 = require("./universities.service");
const universities_controller_1 = require("./universities.controller");
const university_schema_1 = require("./university.schema");
const program_schema_1 = require("../programs/program.schema");
const application_requirements_schema_1 = require("../application-requirements/application-requirements.schema");
const scholarship_schema_1 = require("../scholarships/scholarship.schema");
const programs_module_1 = require("../programs/programs.module");
let UniversitiesModule = class UniversitiesModule {
};
exports.UniversitiesModule = UniversitiesModule;
exports.UniversitiesModule = UniversitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'University', schema: university_schema_1.UniversitySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Program', schema: program_schema_1.ProgramSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'ApplicationRequirements', schema: application_requirements_schema_1.ApplicationRequirementsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Scholarship', schema: scholarship_schema_1.ScholarshipSchema }]),
            programs_module_1.ProgramsModule,
        ],
        controllers: [universities_controller_1.UniversitiesController],
        providers: [universities_service_1.UniversitiesService],
    })
], UniversitiesModule);
//# sourceMappingURL=universities.module.js.map