import { Document, Types } from 'mongoose';
export declare class University extends Document {
    name: string;
    country: string;
    place: string;
    feeStructure: {
        tuitionFee: string;
        initialDeposit: string;
    };
    programs: Types.ObjectId[];
    scholarship: Types.ObjectId;
    applicationRequirements: Types.ObjectId;
}
export declare const UniversitySchema: import("mongoose").Schema<University, import("mongoose").Model<University, any, any, any, Document<unknown, any, University> & University & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, University, Document<unknown, {}, import("mongoose").FlatRecord<University>> & import("mongoose").FlatRecord<University> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
