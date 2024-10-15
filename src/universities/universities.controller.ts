import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto'; // Make sure to create this DTO

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  async createUniversity(@Body() createUniversityDto: CreateUniversityDto) {
      return this.universitiesService.createUniversity(createUniversityDto);
  }
  

  @Get()
  async getAllUniversities() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  async getUniversityById(@Param('id') id: string) {
    return this.universitiesService.findOne(id);
  }

  @Put(':id')
  async updateUniversity(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  async deleteUniversity(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
