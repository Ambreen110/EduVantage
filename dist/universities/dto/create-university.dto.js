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
exports.CreateUniversityDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_scholarship_dto_1 = require("../../scholarships/dto/create-scholarship.dto");
const create_program_dto_1 = require("../../programs/dto/create-program.dto");
class FeeStructure {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeeStructure.prototype, "tuitionFee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeeStructure.prototype, "initialDeposit", void 0);
class ApplicationRequirements {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplicationRequirements.prototype, "academicRequirement", void 0);
class CreateUniversityDto {
}
exports.CreateUniversityDto = CreateUniversityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUniversityDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUniversityDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUniversityDto.prototype, "place", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FeeStructure),
    __metadata("design:type", FeeStructure)
], CreateUniversityDto.prototype, "feeStructure", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_program_dto_1.CreateProgramDto),
    __metadata("design:type", Array)
], CreateUniversityDto.prototype, "programs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_scholarship_dto_1.CreateScholarshipDto),
    __metadata("design:type", create_scholarship_dto_1.CreateScholarshipDto)
], CreateUniversityDto.prototype, "scholarship", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ApplicationRequirements),
    __metadata("design:type", ApplicationRequirements)
], CreateUniversityDto.prototype, "applicationRequirements", void 0);
//# sourceMappingURL=create-university.dto.js.map