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
        @InjectModel('Scholarship') private readonly scholarshipModel: Model<Scholarship>
    ) {}

    // Creating a University and related schemas
    // Inside UniversitiesService class
    async createUniversity(createUniversityDto: CreateUniversityDto): Promise<University> {
        let applicationRequirementsId = null;
    
        // Conditionally create ApplicationRequirements
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
    
        const programIds = await Promise.all(
            createUniversityDto.programs.map(async (programDto) => {
                const casInterviewValue = programDto.casInterview === "Not specified" ? null :
                                          programDto.casInterview === "Yes" ? true : false;
    
                const program = new this.programModel({
                    ...programDto,
                    casInterview: casInterviewValue,
                });
                const savedProgram = await program.save();
                return savedProgram._id;
            })
        );
    
        // Debug log to verify the ID assignment
        console.log("ApplicationRequirements ID:", applicationRequirementsId);
    
        const university = new this.universityModel({
            ...createUniversityDto,
            programs: programIds,
            scholarship: scholarshipId,
            applicationRequirements: applicationRequirementsId, // Check if this is set correctly
        });
    
        return await university.save();
    }
    
    


    // Find all universities with related documents populated
    async findAll(): Promise<University[]> {
        return this.universityModel
            .find()
            .populate('programs applicationRequirements scholarship')
            .exec();
    }

    // Find one university by ID with related documents populated
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

    // Update a university and its related documents
   // Update a university and its related documents
   async update(id: string, updateUniversityDto: UpdateUniversityDto): Promise<University> {
    const university = await this.universityModel.findById(id).exec();
    if (!university) {
        throw new NotFoundException(`University with ID ${id} not found`);
    }

    if (updateUniversityDto.programs) {
        const programs: Types.ObjectId[] = await Promise.all(
            updateUniversityDto.programs.map(async (programDto): Promise<Types.ObjectId> => {
                if (programDto._id) {
                    await this.programModel.findByIdAndUpdate(programDto._id, programDto);
                    return programDto._id as unknown as Types.ObjectId; // Use type assertion
                } else {
                    const program = new this.programModel(programDto);
                    await program.save();
                    return program._id as Types.ObjectId; // Use type assertion
                }
            })
        );
        university.programs = programs; // Assign ObjectId directly to programs
    }

    // Update ApplicationRequirements and Scholarship
    if (updateUniversityDto.applicationRequirements) {
        await this.appReqModel.findByIdAndUpdate(
            university.applicationRequirements, 
            updateUniversityDto.applicationRequirements,
            { new: true }  // Option to return the updated document
        );
    }
    
    if (updateUniversityDto.scholarship) {
        await this.scholarshipModel.findByIdAndUpdate(university.scholarship, updateUniversityDto.scholarship);
    }

    // Update the University document itself
    await university.set(updateUniversityDto).save();
    return university;
}

    // Remove a university and related documents
    async remove(id: string): Promise<void> {
        const university = await this.universityModel.findById(id).exec();
        if (!university) {
            throw new NotFoundException(`University with ID ${id} not found`);
        }
        await Promise.all([
            this.programModel.deleteMany({ _id: { $in: university.programs } }).exec(),
            this.appReqModel.findByIdAndDelete(university.applicationRequirements).exec(),
            this.scholarshipModel.findByIdAndDelete(university.scholarship).exec(),
            this.universityModel.findByIdAndDelete(id).exec(), // Replaces university.remove()
        ]);
    }
}
