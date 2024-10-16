import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ScholarshipsService } from './scholarships.service';
export declare class ScholarshipsController {
    private readonly scholarshipsService;
    constructor(scholarshipsService: ScholarshipsService);
    create(createScholarshipDto: CreateScholarshipDto): Promise<import("./scholarship.schema").Scholarship>;
}
