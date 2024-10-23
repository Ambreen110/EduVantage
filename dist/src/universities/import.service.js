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
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const university_schema_1 = require("./university.schema");
const fs = require("fs");
const csv = require("csv-parser");
const application_requirements_schema_1 = require("../application-requirements/application-requirements.schema");
const scholarship_schema_1 = require("../scholarships/scholarship.schema");
const program_schema_1 = require("../programs/program.schema");
let ImportService = class ImportService {
    constructor(universityModel, applicationRequirementsModel, scholarshipModel, programModel) {
        this.universityModel = universityModel;
        this.applicationRequirementsModel = applicationRequirementsModel;
        this.scholarshipModel = scholarshipModel;
        this.programModel = programModel;
    }
    cleanInitialDeposit(value) {
        if (!value || value.toUpperCase() === 'N/A')
            return null;
        return parseFloat(value.replace(/[^0-9.]/g, ''));
    }
    parseLanguageRequirements(languages) {
        const requirements = {
            IELTS: null,
            TOEFL: null,
            Duolingo: null,
            PTE: null,
        };
        console.log('Languages string:', languages);
        const languagePairs = languages.split(',').map((lang) => lang.trim());
        const regex = /(IELTS|TOEFL|Duolingo|PTE)[^\d]*([\d.]+)/i;
        languagePairs.forEach((pair) => {
            console.log('Processing pair:', pair);
            const match = pair.match(regex);
            if (match) {
                const key = match[1];
                const value = match[2];
                console.log('Match found:', { key, value });
                if (Object.keys(requirements).includes(key)) {
                    requirements[key] = value;
                }
                else {
                    console.error(`Unexpected key encountered: ${key}`);
                }
            }
            else {
                console.log('No match found for pair:', pair);
            }
        });
        return requirements;
    }
    async importUniversitiesFromCSV(filePath) {
        const universitiesMap = {};
        const applicationRequirementsList = [];
        const scholarshipList = [];
        const programList = [];
        fs.createReadStream(filePath)
            .pipe(csv({ separator: '\t' }))
            .on('data', (row) => {
            console.log('Row read from CSV:', row);
            const applicationRequirements = new this.applicationRequirementsModel({
                academicRequirement: row['Academic Requirements'],
                depositDetails: row['Initial Deposit'],
                offerLetterDuration: row['Offer Letter Duration'],
                otherRequirement: row['Other Requirements'],
            });
            applicationRequirementsList.push(applicationRequirements);
            const scholarship = new this.scholarshipModel({
                name: row['Scholarship'],
                amount: row['Amount'],
                eligibility: row['Eligibility'],
            });
            scholarshipList.push(scholarship);
            const englishLanguageTest = this.parseLanguageRequirements(row['Language Requirements']);
            const program = new this.programModel({
                type: row['Program Type'] || 'Unknown Program Type',
                englishLanguageTest,
                name: row['Program'],
                duration: row['Program Duration'],
                initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']) || 0,
            });
            programList.push(program);
            const universityName = row['University'];
            if (!universitiesMap[universityName]) {
                universitiesMap[universityName] = {
                    name: universityName,
                    country: 'USA',
                    place: row['City/State'],
                    feeStructure: {
                        tuitionFee: row['Tuition Fee'],
                        initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']),
                    },
                    applicationRequirements: applicationRequirements,
                    scholarship: scholarship,
                    programs: [],
                };
            }
            universitiesMap[universityName].programs.push(program);
        })
            .on('end', async () => {
            const savedApplicationRequirements = await this.applicationRequirementsModel.insertMany(applicationRequirementsList);
            const savedScholarships = await this.scholarshipModel.insertMany(scholarshipList);
            const savedPrograms = await this.programModel.insertMany(programList);
            const savedUniversities = Object.values(universitiesMap).map((university, index) => ({
                ...university,
                applicationRequirements: savedApplicationRequirements[index]._id,
                scholarship: savedScholarships[index]._id,
                programs: university.programs.map((program) => program._id),
            }));
            await this.universityModel.insertMany(savedUniversities);
            console.log('CSV file successfully processed and data imported');
        })
            .on('error', (error) => {
            console.error(`Error reading CSV file: ${error.message}`);
        });
    }
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(university_schema_1.University.name)),
    __param(1, (0, mongoose_1.InjectModel)(application_requirements_schema_1.ApplicationRequirements.name)),
    __param(2, (0, mongoose_1.InjectModel)(scholarship_schema_1.Scholarship.name)),
    __param(3, (0, mongoose_1.InjectModel)(program_schema_1.Program.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ImportService);
//# sourceMappingURL=import.service.js.map