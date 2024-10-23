import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Program extends Document {
    type: string;
    englishLanguageTest: {
        IELTS?: string | null;
        TOEFL?: string | null;
        Duolingo?: string | null;
        PTE?: string | null;
    };
    casInterview?: 'Yes' | 'No' | 'Not specified';
    offerLetterDuration?: string;
    initialDeposit?: number;
}
export declare const ProgramSchema: MongooseSchema<Program, import("mongoose").Model<Program, any, any, any, Document<unknown, any, Program> & Program & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Program, Document<unknown, {}, import("mongoose").FlatRecord<Program>> & import("mongoose").FlatRecord<Program> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
