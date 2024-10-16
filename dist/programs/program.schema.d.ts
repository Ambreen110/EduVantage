import mongoose, { Document, Types } from 'mongoose';
export declare class Program extends Document {
    static insertMany(programs: Program[]): void;
    type: string;
    englishLanguageTest: {
        IELTS?: string;
        Duolingo?: string;
        TOEFL?: string;
    };
    initialDeposit?: number;
    casInterview: 'Yes' | 'No' | 'Not specified' | null;
    offerLetterDuration: string;
    university: Types.ObjectId;
}
export declare const ProgramSchema: mongoose.Schema<Program, mongoose.Model<Program, any, any, any, mongoose.Document<unknown, any, Program> & Program & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Program, mongoose.Document<unknown, {}, mongoose.FlatRecord<Program>> & mongoose.FlatRecord<Program> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
