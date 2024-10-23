import { CreateProgramDto } from 'src/programs/dto/create-program.dto';
export declare class UpdateUniversityDto {
    name?: string;
    country?: string;
    place?: string;
    feeStructure?: {
        tuitionFeeRange?: string;
        initialDeposit?: number;
    };
    programs?: CreateProgramDto[];
    scholarship?: {
        details?: string;
    };
    applicationRequirements?: {
        academicRequirement?: string;
    };
}
