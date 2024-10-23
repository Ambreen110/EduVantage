import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ScholarshipsService } from './scholarships.service';
import { Scholarship } from './scholarship.schema';
export declare class ScholarshipsController {
    private readonly scholarshipsService;
    constructor(scholarshipsService: ScholarshipsService);
    create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship>;
    findAll(): Promise<Scholarship[]>;
    search(query: string): Promise<Scholarship[]>;
    findById(id: string): Promise<Scholarship>;
    update(id: string, updateData: Partial<CreateScholarshipDto>): Promise<Scholarship>;
    delete(id: string): Promise<any>;
}
