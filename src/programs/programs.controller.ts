import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './program.schema';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  async create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return await this.programsService.create(createProgramDto);
  }

  @Get()
  async findAll(): Promise<Program[]> {
    return await this.programsService.findAll();
  }
  @Get('search')
  async searchPrograms(@Query('query') query: string) {
    return await this.programsService.search(query);
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Program> {
    return await this.programsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProgramDto: CreateProgramDto): Promise<Program> {
    return await this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Program> {
    return await this.programsService.delete(id);
  }
}

