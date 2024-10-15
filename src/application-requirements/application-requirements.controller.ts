import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApplicationRequirementsService } from './application-requirements.service';
import { CreateApplicationRequirementDto } from './dto/create-application-requirement.dto';

@Controller('application-requirements')
export class ApplicationRequirementsController {
  constructor(private readonly appReqService: ApplicationRequirementsService) {}

  @Post()
  async create(@Body() createAppReqDto: CreateApplicationRequirementDto) {
    return this.appReqService.create(createAppReqDto);
  }

  @Get()
  async findAll() {
    return this.appReqService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.appReqService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateApplicationRequirementDto>) {
    return this.appReqService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.appReqService.delete(id);
  }
}
