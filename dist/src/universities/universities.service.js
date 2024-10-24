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
exports.UniversitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UniversitiesService = class UniversitiesService {
    constructor(universityModel, programModel, appReqModel, scholarshipModel) {
        this.universityModel = universityModel;
        this.programModel = programModel;
        this.appReqModel = appReqModel;
        this.scholarshipModel = scholarshipModel;
    }
    async createUniversity(createUniversityDto) {
        try {
            let applicationRequirementsId = null;
            if (createUniversityDto.applicationRequirements) {
                const appReq = new this.appReqModel(createUniversityDto.applicationRequirements);
                const savedAppReq = await appReq.save();
                applicationRequirementsId = savedAppReq._id;
            }
            let scholarshipId = null;
            if (createUniversityDto.scholarship) {
                const scholarship = new this.scholarshipModel(createUniversityDto.scholarship);
                const savedScholarship = await scholarship.save();
                scholarshipId = savedScholarship._id;
            }
            const programs = await Promise.all(createUniversityDto.programs.map(async (programDto) => {
                const program = new this.programModel(programDto);
                const savedProgram = await program.save();
                return savedProgram._id;
            }));
            const university = new this.universityModel({
                ...createUniversityDto,
                programs,
                scholarship: scholarshipId,
                applicationRequirements: applicationRequirementsId,
            });
            return await university.save();
        }
        catch (error) {
            throw new Error(`Error creating university: ${error.message}`);
        }
    }
    async findAll() {
        return this.universityModel
            .find()
            .populate('programs applicationRequirements scholarship')
            .exec();
    }
    async findOne(id) {
        const university = await this.universityModel
            .findById(id)
            .populate('programs applicationRequirements scholarship')
            .exec();
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${id} not found`);
        }
        return university;
    }
    async update(id, updateUniversityDto) {
        const university = await this.universityModel.findById(id).exec();
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${id} not found`);
        }
        if (updateUniversityDto.programs) {
            const programs = await Promise.all(updateUniversityDto.programs.map(async (programDto) => {
                if (programDto._id) {
                    const updatedProgram = await this.programModel.findByIdAndUpdate(programDto._id, programDto, { new: true });
                    return updatedProgram?._id;
                }
                else {
                    const newProgram = new this.programModel(programDto);
                    const savedProgram = await newProgram.save();
                    return savedProgram._id;
                }
            }));
            university.programs = programs.map((program) => program);
        }
        if (updateUniversityDto.applicationRequirements) {
            const updatedAppReq = await this.appReqModel.findByIdAndUpdate(university.applicationRequirements, updateUniversityDto.applicationRequirements, { new: true });
            university.applicationRequirements = updatedAppReq?._id;
        }
        if (updateUniversityDto.scholarship) {
            const updatedScholarship = await this.scholarshipModel.findByIdAndUpdate(university.scholarship, updateUniversityDto.scholarship, { new: true });
            university.scholarship = updatedScholarship?._id;
        }
        return await university.set(updateUniversityDto).save();
    }
    async remove(id) {
        const university = await this.universityModel.findById(id).exec();
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${id} not found`);
        }
        await Promise.all([
            this.programModel.deleteMany({ _id: { $in: university.programs } }).exec(),
            this.appReqModel.findByIdAndDelete(university.applicationRequirements).exec(),
            this.scholarshipModel.findByIdAndDelete(university.scholarship).exec(),
            this.universityModel.findByIdAndDelete(id).exec(),
        ]);
    }
    async search(query) {
        const searchCriteria = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } },
                { place: { $regex: query, $options: 'i' } },
                { 'feeStructure.tuitionFee': { $regex: query, $options: 'i' } },
                { 'feeStructure.initialDeposit': { $regex: query, $options: 'i' } },
                { 'programs.type': { $regex: query, $options: 'i' } },
                { 'programs.offerLetterDuration': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.IELTS': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.Duolingo': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.TOEFL': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.PTE': { $regex: query, $options: 'i' } },
                { 'programs.casInterview': { $regex: query, $options: 'i' } },
                { 'scholarship.name': { $regex: query, $options: 'i' } },
                { 'scholarship.eligibility': { $regex: query, $options: 'i' } },
                { 'applicationRequirements.academicRequirement': { $regex: query, $options: 'i' } },
            ]
        };
        return this.universityModel
            .find(searchCriteria)
            .populate('programs applicationRequirements scholarship')
            .exec();
    }
};
exports.UniversitiesService = UniversitiesService;
exports.UniversitiesService = UniversitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('University')),
    __param(1, (0, mongoose_1.InjectModel)('Program')),
    __param(2, (0, mongoose_1.InjectModel)('ApplicationRequirements')),
    __param(3, (0, mongoose_1.InjectModel)('Scholarship')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UniversitiesService);
//# sourceMappingURL=universities.service.js.map