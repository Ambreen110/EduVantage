import { IsOptional, IsString } from 'class-validator';

export class EnglishLanguageTestDto {
  @IsOptional()
  @IsString()
  IELTS?: string;

  @IsOptional()
  @IsString()
  Duolingo?: string;

  @IsOptional()
  @IsString()
  TOEFL?: string;

  @IsOptional()
  @IsString()
  PTE?: string; 
}
