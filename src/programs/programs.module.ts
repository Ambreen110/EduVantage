import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { Program, ProgramSchema } from './program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService, MongooseModule], // Export the ProgramsService and MongooseModule
})
export class ProgramsModule {}
