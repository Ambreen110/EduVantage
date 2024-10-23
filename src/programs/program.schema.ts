import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Program extends Document {
  @Prop({ required: true })
  type: string;

  // Define englishLanguageTest as a flexible object schema (using Schema.Types.Mixed)
  @Prop({ type: MongooseSchema.Types.Mixed, default: {} }) 
  englishLanguageTest: {
    IELTS?: string | null;
    TOEFL?: string | null;
    Duolingo?: string | null;
    PTE?: string | null;
  };

  @Prop({ enum: ['Yes', 'No', 'Not specified'], default: 'Not specified' })
  casInterview?: 'Yes' | 'No' | 'Not specified';

  @Prop()
  offerLetterDuration?: string;

  @Prop({ type: Number })
  initialDeposit?: number;
}

// Create the schema from the class
export const ProgramSchema = SchemaFactory.createForClass(Program);
