import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from './scholarship.schema'; 
import { CreateScholarshipDto } from './dto/create-scholarship.dto'; 

@Injectable()
export class ScholarshipsService {
  constructor(@InjectModel(Scholarship.name) private scholarshipModel: Model<Scholarship>) {}

  async create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship> {
    const newScholarship = new this.scholarshipModel(createScholarshipDto);
    return newScholarship.save();
  }

  async findAll(): Promise<Scholarship[]> {
    return this.scholarshipModel.find().exec();
  }

  async findById(id: string): Promise<Scholarship> {
    return this.scholarshipModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<CreateScholarshipDto>): Promise<Scholarship> {
    return this.scholarshipModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.scholarshipModel.findByIdAndDelete(id).exec();
  }

  async search(query: string): Promise<Scholarship[]> {
    const regex = new RegExp(query, 'i');
    return this.scholarshipModel.find({
      $or: [
        { name: { $regex: regex } },
        { eligibility: { $regex: regex } },
      ],
    }).exec();
  }
}
