import { CreateScholarshipDto } from '../../scholarships/dto/create-scholarship.dto';
import { CreateProgramDto } from 'src/programs/dto/create-program.dto';
declare class FeeStructure {
    tuitionFee: string;
    initialDeposit: string;
}
declare class ApplicationRequirements {
    academicRequirement: string;
}
export declare class CreateUniversityDto {
    name: string;
    country: string;
    place: string;
    feeStructure: FeeStructure;
    programs: CreateProgramDto[];
    scholarship?: CreateScholarshipDto;
    applicationRequirements?: ApplicationRequirements;
}
export {};
