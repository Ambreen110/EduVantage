import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { UniversitySchema } from './university.schema'; 
import { ProgramSchema } from '../programs/program.schema'; // Import Program schema
import { ApplicationRequirementsSchema } from '../application-requirements/application-requirements.schema'; // Import ApplicationRequirements schema
import { ScholarshipSchema } from '../scholarships/scholarship.schema'; // Import Scholarship schema
import { ProgramsModule } from '../programs/programs.module'; // Assuming you have a ProgramsModule

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'University', schema: UniversitySchema }]),
        MongooseModule.forFeature([{ name: 'Program', schema: ProgramSchema }]), // Register Program model
        MongooseModule.forFeature([{ name: 'ApplicationRequirements', schema: ApplicationRequirementsSchema }]), // Register ApplicationRequirements model
        MongooseModule.forFeature([{ name: 'Scholarship', schema: ScholarshipSchema }]), // Register Scholarship model
        ProgramsModule, // Import ProgramsModule if it's separate
    ],
    controllers: [UniversitiesController],
    providers: [UniversitiesService],
})
export class UniversitiesModule {}
