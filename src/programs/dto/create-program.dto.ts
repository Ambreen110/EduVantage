import { IsString, IsOptional, IsObject, IsNumber } from 'class-validator';
import { EnglishLanguageTestDto } from './english-language-test.dto';

export class CreateProgramDto {
  @IsOptional()
  _id?: string;

  @IsString()
  readonly type: string;

  @IsOptional()
  @IsObject()
  readonly englishLanguageTest?: EnglishLanguageTestDto;

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
