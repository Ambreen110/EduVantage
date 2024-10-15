import { IsOptional, IsString, IsNumber, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProgramDto } from 'src/programs/dto/create-program.dto';

export class UpdateUniversityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsObject()
  feeStructure?: {
    tuitionFeeRange?: string;
    initialDeposit?: number;
  };

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramDto)
  programs?: CreateProgramDto[];

  @IsOptional()
  @IsObject()
  scholarship?: {
    details?: string;
  };

  @IsOptional()
  @IsObject()
  applicationRequirements?: {
    academicRequirement?: string;
  };
}
