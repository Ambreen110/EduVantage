import { IsString, IsArray, IsOptional, ValidateNested, IsObject, IsDefined, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScholarshipDto } from '../../scholarships/dto/create-scholarship.dto';
import { CreateProgramDto } from 'src/programs/dto/create-program.dto';

class FeeStructure {
  @IsString()
  tuitionFee: string;

  @IsString()
  initialDeposit: string;
}

class ApplicationRequirements {
  @IsString()
  academicRequirement: string;
}

export class CreateUniversityDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  place: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => FeeStructure)
  feeStructure: FeeStructure;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramDto)
  programs: CreateProgramDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateScholarshipDto)
  scholarship?: CreateScholarshipDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicationRequirements)
  applicationRequirements?: ApplicationRequirements;
}
