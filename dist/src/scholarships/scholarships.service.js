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
exports.ScholarshipsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const scholarship_schema_1 = require("./scholarship.schema");
let ScholarshipsService = class ScholarshipsService {
    constructor(scholarshipModel) {
        this.scholarshipModel = scholarshipModel;
    }
    async create(createScholarshipDto) {
        const newScholarship = new this.scholarshipModel(createScholarshipDto);
        return newScholarship.save();
    }
    async findAll() {
        return this.scholarshipModel.find().exec();
    }
    async findById(id) {
        return this.scholarshipModel.findById(id).exec();
    }
    async update(id, updateData) {
        return this.scholarshipModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async delete(id) {
        return this.scholarshipModel.findByIdAndDelete(id).exec();
    }
    async search(query) {
        const regex = new RegExp(query, 'i');
        return this.scholarshipModel.find({
            $or: [
                { name: { $regex: regex } },
                { eligibility: { $regex: regex } },
            ],
        }).exec();
    }
};
exports.ScholarshipsService = ScholarshipsService;
exports.ScholarshipsService = ScholarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scholarship_schema_1.Scholarship.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ScholarshipsService);
//# sourceMappingURL=scholarships.service.js.map