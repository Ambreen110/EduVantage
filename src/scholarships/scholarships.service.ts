import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from './scholarship.schema'; // Adjust the path as necessary
import { CreateScholarshipDto } from './dto/create-scholarship.dto'; // Adjust the path as necessary

@Injectable()
export class ScholarshipsService {
  constructor(@InjectModel(Scholarship.name) private scholarshipModel: Model<Scholarship>) {}

  async create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship> {
    const newScholarship = new this.scholarshipModel(createScholarshipDto);
    return newScholarship.save();
  }
}
