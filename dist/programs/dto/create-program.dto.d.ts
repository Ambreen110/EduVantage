export declare class CreateProgramDto {
    readonly _id?: string;
    readonly type: string;
    readonly englishLanguageTest?: {
        IELTS?: string;
        Duolingo?: string;
        TOEFL?: string;
    };
    readonly initialDeposit?: number;
    readonly casInterview?: 'Yes' | 'No' | 'Not specified' | null;
    readonly offerLetterDuration?: string;
}
