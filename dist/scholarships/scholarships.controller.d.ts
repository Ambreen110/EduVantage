import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ScholarshipsService } from './scholarships.service';
import { Scholarship } from './scholarship.schema';
export declare class ScholarshipsController {
    private readonly scholarshipsService;
    constructor(scholarshipsService: ScholarshipsService);
    create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship>;
    findAll(): Promise<Scholarship[]>;
}
