import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationRequirements, ApplicationRequirementsSchema } from './application-requirements.schema';
import { ApplicationRequirementsService } from './application-requirements.service';
import { ApplicationRequirementsController } from './application-requirements.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ApplicationRequirements.name, schema: ApplicationRequirementsSchema }])],
  providers: [ApplicationRequirementsService],
  controllers: [ApplicationRequirementsController],
})
export class ApplicationRequirementsModule {}
