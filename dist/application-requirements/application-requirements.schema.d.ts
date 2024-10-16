import { Document } from 'mongoose';
export declare class ApplicationRequirements extends Document {
    depositDetails?: string;
    offerLetterDuration?: string;
    otherRequirement?: string;
    academicRequirement?: string;
}
export declare const ApplicationRequirementsSchema: import("mongoose").Schema<ApplicationRequirements, import("mongoose").Model<ApplicationRequirements, any, any, any, Document<unknown, any, ApplicationRequirements> & ApplicationRequirements & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApplicationRequirements, Document<unknown, {}, import("mongoose").FlatRecord<ApplicationRequirements>> & import("mongoose").FlatRecord<ApplicationRequirements> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
