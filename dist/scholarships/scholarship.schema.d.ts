import mongoose, { Document } from 'mongoose';
import { University } from 'src/universities/university.schema';
export declare class Scholarship extends Document {
    name: string;
    amount: number;
    eligibility: string;
    university: University;
}
export declare const ScholarshipSchema: mongoose.Schema<Scholarship, mongoose.Model<Scholarship, any, any, any, mongoose.Document<unknown, any, Scholarship> & Scholarship & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Scholarship, mongoose.Document<unknown, {}, mongoose.FlatRecord<Scholarship>> & mongoose.FlatRecord<Scholarship> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
