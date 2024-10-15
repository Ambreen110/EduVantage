import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateProgramDto {
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @IsString()
  readonly type: string;

  @IsOptional()
  @IsObject()
  readonly englishLanguageTest?: {
    IELTS?: string;
    Duolingo?: string;
    TOEFL?: string;
  };

  @IsOptional()
  @IsNumber()
  readonly initialDeposit?: number;

  @IsOptional()
  @IsString()
  readonly casInterview?: 'Yes' | 'No' | 'Not specified' | null;

  @IsOptional()
  @IsString()
  readonly offerLetterDuration?: string;
}
