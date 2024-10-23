import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationRequirementsController } from './application-requirements.controller';
import { ApplicationRequirementsService } from './application-requirements.service';
import { ApplicationRequirements, ApplicationRequirementsSchema } from './application-requirements.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApplicationRequirements.name, schema: ApplicationRequirementsSchema }]),
  ],
  controllers: [ApplicationRequirementsController],
  providers: [ApplicationRequirementsService],
})
export class ApplicationRequirementsModule {}
