import { EnglishLanguageTestDto } from './english-language-test.dto';
export declare class CreateProgramDto {
    _id?: string;
    readonly type: string;
    readonly englishLanguageTest?: EnglishLanguageTestDto;
    readonly initialDeposit?: number;
    readonly casInterview?: 'Yes' | 'No' | 'Not specified' | null;
    readonly offerLetterDuration?: string;
}
