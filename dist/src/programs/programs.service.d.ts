import { Model } from 'mongoose';
import { Program } from './program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
import { University } from 'src/universities/university.schema';
export declare class ProgramsService {
    private programModel;
    universityModel: any;
    constructor(programModel: Model<Program>);
    create(createProgramDto: CreateProgramDto): Promise<Program>;
    findAll(): Promise<Program[]>;
    insertMany(programs: CreateProgramDto[]): Promise<Program[]>;
    findById(id: string): Promise<Program>;
    search(query: string): Promise<Program[]>;
    update(id: string, updateProgramDto: CreateProgramDto): Promise<Program>;
    delete(id: string): Promise<Program>;
    addProgramToUniversity(universityId: string, createProgramDto: CreateProgramDto): Promise<University>;
}
