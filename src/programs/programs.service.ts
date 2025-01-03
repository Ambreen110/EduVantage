import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program } from './program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
import { University } from 'src/universities/university.schema';

@Injectable()
export class ProgramsService {
  universityModel: any;
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

  async insertMany(programs: CreateProgramDto[]): Promise<Program[]> {
    const createdPrograms = await this.programModel.insertMany(programs);
    return createdPrograms.map(program => program.toObject()); // Convert Mongoose Document to plain object
}

  async findById(id: string): Promise<Program> {
    return await this.programModel.findById(id).exec();
  }
 
 
  async search(query: string): Promise<Program[]> {
    // Check if the query is a number
    const numericQuery = parseFloat(query);
    const isNumericSearch = !isNaN(numericQuery);
  
    const searchCriteria = {
      $or: [
        { type: { $regex: query, $options: 'i' } },
        ...(isNumericSearch
          ? [
              { 'englishLanguageTest.IELTS': { $gte: numericQuery } },
              { 'englishLanguageTest.TOEFL': { $gte: numericQuery } },
              { 'englishLanguageTest.PTE': { $gte: numericQuery } },
              { 'englishLanguageTest.Duolingo': { $gte: numericQuery } },
            ]
          : [
              { 'englishLanguageTest.IELTS': { $regex: query.replace('IELTS:', ''), $options: 'i' } },
              { 'englishLanguageTest.TOEFL': { $regex: query.replace('TOEFL:', ''), $options: 'i' } },
              { 'englishLanguageTest.PTE': { $regex: query.replace('PTE:', ''), $options: 'i' } },
              { 'englishLanguageTest.Duolingo': { $regex: query.replace('Duolingo:', ''), $options: 'i' } },
            ]
        ),
        { offerLetterDuration: { $regex: query, $options: 'i' } },
      ]
    };
  
    return await this.programModel.find(searchCriteria).exec();
  }
  


  async update(id: string, updateProgramDto: CreateProgramDto): Promise<Program> {
    return await this.programModel.findByIdAndUpdate(id, updateProgramDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Program> {
    return await this.programModel.findByIdAndDelete(id).exec();
  }

  async addProgramToUniversity(universityId: string, createProgramDto: CreateProgramDto): Promise<University> {
    const university = await this.universityModel.findById(universityId);
    if (!university) {
      throw new NotFoundException(`University with ID ${universityId} not found`);
    }
    const newProgram = new this.programModel(createProgramDto);
    university.programs.push(newProgram);
    await university.save();
    return university;
  }
}
