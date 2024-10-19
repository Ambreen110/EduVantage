import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Program } from 'src/programs/program.schema';
import { CreateScholarshipDto } from 'src/scholarships/dto/create-scholarship.dto';

@Schema()
export class University extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  place: string;

  @Prop({ type: Object })
  feeStructure: {
    tuitionFee: string;
    initialDeposit: string;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Program' }] })
  programs: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Scholarship' })
  scholarship: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ApplicationRequirements' })
  applicationRequirements: Types.ObjectId;
}

export const UniversitySchema = SchemaFactory.createForClass(University);
