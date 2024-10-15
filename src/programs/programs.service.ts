import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program } from './program.schema';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  addProgramToUniversity(universityId: string, createProgramDto: any): import("../universities/university.schema").University | PromiseLike<import("../universities/university.schema").University> {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const newProgram = new this.programModel(createProgramDto);
    return await newProgram.save();
  }

  async findAll(): Promise<Program[]> {
    return await this.programModel.find().exec();
  }

  async findById(id: string): Promise<Program> {
    return await this.programModel.findById(id).exec();
  }

  async update(id: string, updateProgramDto: CreateProgramDto): Promise<Program> {
    return await this.programModel.findByIdAndUpdate(id, updateProgramDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Program> {
    return await this.programModel.findByIdAndDelete(id).exec();
  }
}
