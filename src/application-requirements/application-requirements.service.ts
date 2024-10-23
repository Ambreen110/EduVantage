import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationRequirements } from './application-requirements.schema';
import { CreateApplicationRequirementDto } from './dto/create-application-requirement.dto';

@Injectable()
export class ApplicationRequirementsService {
  constructor(
    @InjectModel(ApplicationRequirements.name) private appReqModel: Model<ApplicationRequirements>,
  ) {}

  async create(createApplicationRequirementDto: CreateApplicationRequirementDto): Promise<ApplicationRequirements> {
    const createdRequirement = new this.appReqModel(createApplicationRequirementDto);
    return createdRequirement.save();
  }

  async findAll(): Promise<ApplicationRequirements[]> {
    return this.appReqModel.find().exec();
  }

  async findById(id: string): Promise<ApplicationRequirements> {
    return this.appReqModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<ApplicationRequirements>): Promise<ApplicationRequirements> {
    return this.appReqModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.appReqModel.findByIdAndDelete(id).exec();
  }

  // New search method
  async search(query: string): Promise<ApplicationRequirements[]> {
    console.log('Search query:', query); // Log the incoming query
    const regex = new RegExp(query, 'i'); // Create a case-insensitive regex pattern
    return this.appReqModel.find({
      $or: [
        { offerLetterDuration: { $regex: regex } },
        { depositDetails: { $regex: regex } },
        { otherRequirement: { $regex: regex } },
        { academicRequirement: { $regex: regex } },
      ],
    }).exec();
  }
  
  
}
