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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const program_schema_1 = require("./program.schema");
let ProgramsService = class ProgramsService {
    constructor(programModel) {
        this.programModel = programModel;
    }
    async create(createProgramDto) {
        const newProgram = new this.programModel(createProgramDto);
        return await newProgram.save();
    }
    async findAll() {
        return await this.programModel.find().exec();
    }
    async insertMany(programs) {
        const createdPrograms = await this.programModel.insertMany(programs);
        return createdPrograms.map(program => program.toObject());
    }
    async findById(id) {
        return await this.programModel.findById(id).exec();
    }
    async update(id, updateProgramDto) {
        return await this.programModel.findByIdAndUpdate(id, updateProgramDto, { new: true }).exec();
    }
    async delete(id) {
        return await this.programModel.findByIdAndDelete(id).exec();
    }
    async addProgramToUniversity(universityId, createProgramDto) {
        const university = await this.universityModel.findById(universityId);
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${universityId} not found`);
        }
        const newProgram = new this.programModel(createProgramDto);
        university.programs.push(newProgram);
        await university.save();
        return university;
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(program_schema_1.Program.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map