import { Model } from 'mongoose';
import { University } from './university.schema';
import { Program } from '../programs/program.schema';
import { ApplicationRequirements } from '../application-requirements/application-requirements.schema';
import { Scholarship } from '../scholarships/scholarship.schema';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
export declare class UniversitiesService {
    private readonly universityModel;
    private readonly programModel;
    private readonly appReqModel;
    private readonly scholarshipModel;
    constructor(universityModel: Model<University>, programModel: Model<Program>, appReqModel: Model<ApplicationRequirements>, scholarshipModel: Model<Scholarship>);
    createUniversity(createUniversityDto: CreateUniversityDto): Promise<University>;
    findAll(): Promise<University[]>;
    findOne(id: string): Promise<University>;
    update(id: string, updateUniversityDto: UpdateUniversityDto): Promise<University>;
    remove(id: string): Promise<void>;
}
