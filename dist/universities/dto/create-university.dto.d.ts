import { CreateScholarshipDto } from '../../scholarships/dto/create-scholarship.dto';
declare class EnglishLanguageTestDto {
    IELTS?: string;
    Duolingo?: string;
    TOEFL?: string;
}
declare class ProgramDto {
    type: string;
    englishLanguageTest: EnglishLanguageTestDto;
    casInterview?: string;
    offerLetterDuration?: string;
}
export declare class CreateUniversityDto {
    name: string;
    country: string;
    place: string;
    feeStructure: {};
    programs: ProgramDto[];
    scholarship?: CreateScholarshipDto;
    applicationRequirements: {
        academicRequirement: string;
    };
}
export {};
