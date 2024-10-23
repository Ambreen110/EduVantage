import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './program.schema';
export declare class ProgramsController {
    private readonly programsService;
    constructor(programsService: ProgramsService);
    create(createProgramDto: CreateProgramDto): Promise<Program>;
    findAll(): Promise<Program[]>;
    searchPrograms(query: string): Promise<Program[]>;
    findById(id: string): Promise<Program>;
    update(id: string, updateProgramDto: CreateProgramDto): Promise<Program>;
    delete(id: string): Promise<Program>;
}
