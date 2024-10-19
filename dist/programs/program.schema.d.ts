import { Document } from 'mongoose';
import { EnglishLanguageTestDto } from './dto/english-language-test.dto';
export declare class Program extends Document {
    type: string;
    englishLanguageTest: EnglishLanguageTestDto;
    casInterview?: 'Yes' | 'No' | 'Not specified';
    offerLetterDuration?: string;
    initialDeposit?: number;
}
export declare const ProgramSchema: import("mongoose").Schema<Program, import("mongoose").Model<Program, any, any, any, Document<unknown, any, Program> & Program & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Program, Document<unknown, {}, import("mongoose").FlatRecord<Program>> & import("mongoose").FlatRecord<Program> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
