import { IsString, IsArray, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScholarshipDto } from '../../scholarships/dto/create-scholarship.dto'; // Import your scholarship DTO

class EnglishLanguageTestDto {
    @IsOptional()
    @IsString()
    IELTS?: string;

    @IsOptional()
    @IsString()
    Duolingo?: string;

    @IsOptional()
    @IsString()
    TOEFL?: string;
}

class ProgramDto {
    @IsString()
    type: string;

    @ValidateNested()
    @Type(() => EnglishLanguageTestDto)
    englishLanguageTest: EnglishLanguageTestDto;

    @IsOptional()
    @IsString()
    casInterview?: string;

    @IsOptional()
    @IsString()
    offerLetterDuration?: string;
}

export class CreateUniversityDto {
    @IsString()
    name: string;

    @IsString()
    country: string;

    @IsString()
    place: string;

    @IsObject()
    feeStructure: {
        // Specify any relevant properties if needed
    };

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProgramDto)
    programs: ProgramDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateScholarshipDto) // Use the scholarship DTO here
    scholarship?: CreateScholarshipDto;

    @IsOptional()
    @IsObject()
    applicationRequirements: {
        academicRequirement: string;
    };
}
