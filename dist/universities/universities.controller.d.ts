import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
export declare class UniversitiesController {
    private readonly universitiesService;
    constructor(universitiesService: UniversitiesService);
    createUniversity(createUniversityDto: CreateUniversityDto): Promise<import("./university.schema").University>;
    getAllUniversities(): Promise<import("./university.schema").University[]>;
    searchUniversities(query: string): Promise<import("./university.schema").University[]>;
    getUniversityById(id: string): Promise<import("./university.schema").University>;
    updateUniversity(id: string, updateUniversityDto: UpdateUniversityDto): Promise<import("./university.schema").University>;
    deleteUniversity(id: string): Promise<void>;
}
