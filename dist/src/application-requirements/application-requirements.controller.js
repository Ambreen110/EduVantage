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
exports.ApplicationRequirementsController = void 0;
const common_1 = require("@nestjs/common");
const application_requirements_service_1 = require("./application-requirements.service");
const create_application_requirement_dto_1 = require("./dto/create-application-requirement.dto");
let ApplicationRequirementsController = class ApplicationRequirementsController {
    constructor(appReqService) {
        this.appReqService = appReqService;
    }
    async create(createAppReqDto) {
        return this.appReqService.create(createAppReqDto);
    }
    async findAll() {
        return this.appReqService.findAll();
    }
    async search(query) {
        try {
            return await this.appReqService.search(query);
        }
        catch (error) {
            console.error('Error during search:', error);
            throw new common_1.HttpException('Search failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        return this.appReqService.findById(id);
    }
    async update(id, updateData) {
        return this.appReqService.update(id, updateData);
    }
    async delete(id) {
        return this.appReqService.delete(id);
    }
};
exports.ApplicationRequirementsController = ApplicationRequirementsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_requirement_dto_1.CreateApplicationRequirementDto]),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationRequirementsController.prototype, "delete", null);
exports.ApplicationRequirementsController = ApplicationRequirementsController = __decorate([
    (0, common_1.Controller)('application-requirements'),
    __metadata("design:paramtypes", [application_requirements_service_1.ApplicationRequirementsService])
], ApplicationRequirementsController);
//# sourceMappingURL=application-requirements.controller.js.map