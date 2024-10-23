import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { University } from './university.schema';
import { Program } from '../programs/program.schema';
import { ApplicationRequirements } from '../application-requirements/application-requirements.schema';
import { Scholarship } from '../scholarships/scholarship.schema';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversitiesService {
    constructor(
        @InjectModel('University') private readonly universityModel: Model<University>,
        @InjectModel('Program') private readonly programModel: Model<Program>,
        @InjectModel('ApplicationRequirements') private readonly appReqModel: Model<ApplicationRequirements>,
        @InjectModel('Scholarship') private readonly scholarshipModel: Model<Scholarship>,
    ) {}

    async createUniversity(createUniversityDto: CreateUniversityDto): Promise<University> {
        try {
            // Ensure ObjectId types for scholarship and application requirements
            let applicationRequirementsId: Types.ObjectId | null = null;
            if (createUniversityDto.applicationRequirements) {
                const appReq = new this.appReqModel(createUniversityDto.applicationRequirements);
                const savedAppReq = await appReq.save();
                applicationRequirementsId = savedAppReq._id as Types.ObjectId;
            }

            let scholarshipId: Types.ObjectId | null = null;
            if (createUniversityDto.scholarship) {
                const scholarship = new this.scholarshipModel(createUniversityDto.scholarship);
                const savedScholarship = await scholarship.save();
                scholarshipId = savedScholarship._id as Types.ObjectId;
            }

            const programs = await Promise.all(
                createUniversityDto.programs.map(async (programDto) => {
                    const program = new this.programModel(programDto);
                    const savedProgram = await program.save();
                    return savedProgram._id as Types.ObjectId; // Use ObjectId
                })
            );

            const university = new this.universityModel({
                ...createUniversityDto,
                programs, // Array of ObjectIds
                scholarship: scholarshipId,
                applicationRequirements: applicationRequirementsId,
            });

            return await university.save();
        } catch (error) {
            throw new Error(`Error creating university: ${error.message}`);
        }
    }

    async findAll(): Promise<University[]> {
        return this.universityModel
            .find()
            .populate('programs applicationRequirements scholarship')
            .exec();
    }

    async findOne(id: string): Promise<University> {
        const university = await this.universityModel
            .findById(id)
            .populate('programs applicationRequirements scholarship')
            .exec();
        if (!university) {
            throw new NotFoundException(`University with ID ${id} not found`);
        }
        return university;
    }

    async update(id: string, updateUniversityDto: UpdateUniversityDto): Promise<University> {
        const university = await this.universityModel.findById(id).exec();
        
        if (!university) {
            throw new NotFoundException(`University with ID ${id} not found`);
        }

        if (updateUniversityDto.programs) {
            const programs = await Promise.all(
                updateUniversityDto.programs.map(async (programDto) => {
                    if (programDto._id) {
                        const updatedProgram = await this.programModel.findByIdAndUpdate(programDto._id, programDto, { new: true });
                        return updatedProgram?._id as Types.ObjectId; // Use ObjectId
                    } else {
                        const newProgram = new this.programModel(programDto);
                        const savedProgram = await newProgram.save();
                        return savedProgram._id as Types.ObjectId; // Use ObjectId
                    }
                })
            );
            university.programs = programs.map((program) => program as Types.ObjectId);
        }

        if (updateUniversityDto.applicationRequirements) {
            const updatedAppReq = await this.appReqModel.findByIdAndUpdate(
                university.applicationRequirements,
                updateUniversityDto.applicationRequirements,
                { new: true }
            );
            university.applicationRequirements = updatedAppReq?._id as Types.ObjectId;
        }

        if (updateUniversityDto.scholarship) {
            const updatedScholarship = await this.scholarshipModel.findByIdAndUpdate(
                university.scholarship,
                updateUniversityDto.scholarship,
                { new: true }
            );
            university.scholarship = updatedScholarship?._id as Types.ObjectId;
        }

        return await university.set(updateUniversityDto).save();
    }

    async remove(id: string): Promise<void> {
        const university = await this.universityModel.findById(id).exec();
        if (!university) {
            throw new NotFoundException(`University with ID ${id} not found`);
        }
        await Promise.all([
            this.programModel.deleteMany({ _id: { $in: university.programs } }).exec(),
            this.appReqModel.findByIdAndDelete(university.applicationRequirements).exec(),
            this.scholarshipModel.findByIdAndDelete(university.scholarship).exec(),
            this.universityModel.findByIdAndDelete(id).exec(),
        ]);
    }

    async search(query: string): Promise<University[]> {
        // Define the search criteria
        const searchCriteria = {
            $or: [
                // Basic university fields
                { name: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } },
                { place: { $regex: query, $options: 'i' } },
                
                // Searching within feeStructure fields
                { 'feeStructure.tuitionFee': { $regex: query, $options: 'i' } },
                { 'feeStructure.initialDeposit': { $regex: query, $options: 'i' } },
                
                // Program-specific searches
                { 'programs.type': { $regex: query, $options: 'i' } },
                { 'programs.offerLetterDuration': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.IELTS': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.Duolingo': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.TOEFL': { $regex: query, $options: 'i' } },
                { 'programs.englishLanguageTest.PTE': { $regex: query, $options: 'i' } },
                { 'programs.casInterview': { $regex: query, $options: 'i' } },
                
                // Scholarship-specific searches
                { 'scholarship.name': { $regex: query, $options: 'i' } },
                { 'scholarship.eligibility': { $regex: query, $options: 'i' } },
                
                // Application requirements searches
                { 'applicationRequirements.academicRequirement': { $regex: query, $options: 'i' } },
            ]
        };
    
        // Execute search and return populated data
        return this.universityModel
            .find(searchCriteria)
            .populate('programs applicationRequirements scholarship') // populate related schemas
            .exec(); // execute the query
    }
    
    
}
