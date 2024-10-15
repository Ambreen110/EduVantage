import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { University } from 'src/universities/university.schema';

@Schema()
export class Program extends Document {
    static insertMany(programs: Program[]) {
        throw new Error('Method not implemented.');
    }
    @Prop({ required: true })
    type: string; // e.g., 'Bachelor' or 'Master'

    @Prop({
        type: {
            IELTS: { type: String, required: false },
            Duolingo: { type: String, required: false },
            TOEFL: { type: String, required: false },
        },
        required: false,
    })
    englishLanguageTest: {
        IELTS?: string;
        Duolingo?: string;
        TOEFL?: string;
    };

    @Prop({ required: false }) // Make this optional
    initialDeposit?: number;

    @Prop({ type: String })
    casInterview: 'Yes' | 'No' | 'Not specified' | null; // Allowing for null if not specified

    @Prop()
    offerLetterDuration: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'University' })
    university: Types.ObjectId; // Change to ObjectId
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
