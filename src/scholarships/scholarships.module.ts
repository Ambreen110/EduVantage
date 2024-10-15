import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScholarshipsController } from './scholarships.controller';
import { ScholarshipsService } from './scholarships.service';
import { Scholarship, ScholarshipSchema } from './scholarship.schema'; // Adjust the path as necessary

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scholarship.name, schema: ScholarshipSchema }])
  ],
  controllers: [ScholarshipsController],
  providers: [ScholarshipsService],
})
export class ScholarshipsModule {}
