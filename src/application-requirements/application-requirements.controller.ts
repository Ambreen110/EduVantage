import { Controller, Post, Get, Put, Delete, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
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
  @Get('search')
  async search(@Query('query') query: string) {
    try {
      return await this.appReqService.search(query);
    } catch (error) {
      console.error('Error during search:', error);
      throw new HttpException('Search failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

