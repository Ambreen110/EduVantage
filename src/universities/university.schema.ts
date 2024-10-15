import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Program } from '../programs/program.schema';
import { ApplicationRequirements } from '../application-requirements/application-requirements.schema';
import { Scholarship } from '../scholarships/scholarship.schema';

@Schema()
export class University extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    place: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Program' }],
        required: true,
    })
    programs: Types.ObjectId[]; // Change to ObjectId array

    @Prop({
        type: Types.ObjectId,
        ref: 'ApplicationRequirements',
        required: false, // Optional for now
    })
    applicationRequirements: Types.ObjectId; // Change to ObjectId

    @Prop({
        type: Types.ObjectId,
        ref: 'Scholarship',
        required: false, // Optional for now
    })
    scholarship: Types.ObjectId; // Change to ObjectId
}

export const UniversitySchema = SchemaFactory.createForClass(University);
