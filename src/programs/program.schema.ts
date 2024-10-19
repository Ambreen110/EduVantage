import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnglishLanguageTestDto } from './dto/english-language-test.dto';

@Schema()
export class Program extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ type: Object, required: true }) // Correctly reference the DTO type
  englishLanguageTest: EnglishLanguageTestDto;

  @Prop({ enum: ['Yes', 'No', 'Not specified'], default: 'Not specified' })
  casInterview?: 'Yes' | 'No' | 'Not specified';

  @Prop()
  offerLetterDuration?: string;

  @Prop({ type: Number })
  initialDeposit?: number; // Include initialDeposit
}

// Create the schema from the class
export const ProgramSchema = SchemaFactory.createForClass(Program);
