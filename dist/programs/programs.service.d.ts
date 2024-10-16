import { Model } from 'mongoose';
import { Program } from './program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
export declare class ProgramsService {
    private programModel;
    addProgramToUniversity(universityId: string, createProgramDto: any): import("../universities/university.schema").University | PromiseLike<import("../universities/university.schema").University>;
    constructor(programModel: Model<Program>);
    create(createProgramDto: CreateProgramDto): Promise<Program>;
    findAll(): Promise<Program[]>;
    findById(id: string): Promise<Program>;
    update(id: string, updateProgramDto: CreateProgramDto): Promise<Program>;
    delete(id: string): Promise<Program>;
}
