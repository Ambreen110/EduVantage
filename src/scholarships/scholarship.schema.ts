import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { University } from 'src/universities/university.schema';

@Schema()
export class Scholarship extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  amount: number;

  @Prop()
  eligibility: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'University' })
  university: University;
}

export const ScholarshipSchema = SchemaFactory.createForClass(Scholarship);
