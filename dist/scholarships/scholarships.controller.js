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
exports.ScholarshipsController = void 0;
const common_1 = require("@nestjs/common");
const create_scholarship_dto_1 = require("./dto/create-scholarship.dto");
const scholarships_service_1 = require("./scholarships.service");
let ScholarshipsController = class ScholarshipsController {
    constructor(scholarshipsService) {
        this.scholarshipsService = scholarshipsService;
    }
    async create(createScholarshipDto) {
        console.log(createScholarshipDto);
        return this.scholarshipsService.create(createScholarshipDto);
    }
    async findAll() {
        return this.scholarshipsService.findAll();
    }
};
exports.ScholarshipsController = ScholarshipsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scholarship_dto_1.CreateScholarshipDto]),
    __metadata("design:returntype", Promise)
], ScholarshipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScholarshipsController.prototype, "findAll", null);
exports.ScholarshipsController = ScholarshipsController = __decorate([
    (0, common_1.Controller)('scholarships'),
    __metadata("design:paramtypes", [scholarships_service_1.ScholarshipsService])
], ScholarshipsController);
//# sourceMappingURL=scholarships.controller.js.map