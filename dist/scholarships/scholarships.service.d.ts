import { Model } from 'mongoose';
import { Scholarship } from './scholarship.schema';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
export declare class ScholarshipsService {
    private scholarshipModel;
    constructor(scholarshipModel: Model<Scholarship>);
    create(createScholarshipDto: CreateScholarshipDto): Promise<Scholarship>;
    findAll(): Promise<Scholarship[]>;
}
