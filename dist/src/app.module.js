"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const universities_module_1 = require("./universities/universities.module");
const programs_module_1 = require("./programs/programs.module");
const scholarships_module_1 = require("./scholarships/scholarships.module");
const application_requirements_module_1 = require("./application-requirements/application-requirements.module");
const mongoose_1 = require("@nestjs/mongoose");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [universities_module_1.UniversitiesModule, programs_module_1.ProgramsModule, scholarships_module_1.ScholarshipsModule, application_requirements_module_1.ApplicationRequirementsModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://ambreenf110:Ali.712093@cluster0.s8yzr0l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map