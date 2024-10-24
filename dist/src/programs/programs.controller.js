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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const programs_service_1 = require("./programs.service");
const create_program_dto_1 = require("./dto/create-program.dto");
let ProgramsController = class ProgramsController {
    constructor(programsService) {
        this.programsService = programsService;
    }
    async create(createProgramDto) {
        return await this.programsService.create(createProgramDto);
    }
    async findAll() {
        return await this.programsService.findAll();
    }
    async searchPrograms(query) {
        return await this.programsService.search(query);
    }
    async findById(id) {
        return await this.programsService.findById(id);
    }
    async update(id, updateProgramDto) {
        return await this.programsService.update(id, updateProgramDto);
    }
    async delete(id) {
        return await this.programsService.delete(id);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_program_dto_1.CreateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "searchPrograms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_program_dto_1.CreateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "delete", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, common_1.Controller)('programs'),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map