import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversitiesModule } from './universities/universities.module';
import { ProgramsModule } from './programs/programs.module';
import { ScholarshipsModule } from './scholarships/scholarships.module';
import { ApplicationRequirementsModule } from './application-requirements/application-requirements.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UniversitiesModule, ProgramsModule, ScholarshipsModule, ApplicationRequirementsModule,
    MongooseModule.forRoot('mongodb+srv://ambreenf110:Ali.712093@cluster0.s8yzr0l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
