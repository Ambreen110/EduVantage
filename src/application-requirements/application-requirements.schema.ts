import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApplicationRequirements extends Document {
    @Prop({ required: false })
    depositDetails?: string;

    @Prop({ required: false })
    offerLetterDuration?: string;

    @Prop({ required: false })
    otherRequirement?: string;

    @Prop({ required: false })
    academicRequirement?: string; // New field for academic requirements
}

export const ApplicationRequirementsSchema = SchemaFactory.createForClass(ApplicationRequirements);
