import { Body, Controller, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto'; 
import { ScholarshipsService } from './scholarships.service';
import { Scholarship } from './scholarship.schema';

@Controller('scholarships')
export class ScholarshipsController {
  constructor(private readonly scholarshipsService: ScholarshipsService) {}

  @Post()
  async create(@Body() createScholarshipDto: CreateScholarshipDto) {
    console.log(createScholarshipDto);
    return this.scholarshipsService.create(createScholarshipDto);
  }

  @Get()
  async findAll(): Promise<Scholarship[]> {
    return this.scholarshipsService.findAll();
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return this.scholarshipsService.search(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.scholarshipsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateScholarshipDto>) {
    return this.scholarshipsService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.scholarshipsService.delete(id);
  }
}
