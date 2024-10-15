import { IsString, IsOptional, IsNumberString, IsNumber } from 'class-validator';

export class CreateScholarshipDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsString()
    eligibility?: string;
}
