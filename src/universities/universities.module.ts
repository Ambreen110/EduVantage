import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { ImportController } from './import.controller'; // Import your ImportController
import { UniversitySchema } from './university.schema'; 
import { ProgramSchema } from '../programs/program.schema'; 
import { ApplicationRequirementsSchema } from '../application-requirements/application-requirements.schema'; 
import { ScholarshipSchema } from '../scholarships/scholarship.schema'; 
import { ImportService } from './import.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'University', schema: UniversitySchema }, 
      { name: 'Program', schema: ProgramSchema }, 
      { name: 'ApplicationRequirements', schema: ApplicationRequirementsSchema }, 
      { name: 'Scholarship', schema: ScholarshipSchema }
    ]),
  ],
  controllers: [UniversitiesController, ImportController], // Add ImportController here
  providers: [UniversitiesService, ImportService],
})
export class UniversitiesModule {}
