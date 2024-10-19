import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto'; // Adjust the path as necessary
import { ScholarshipsService } from './scholarships.service';
import { Scholarship } from './scholarship.schema';

@Controller('scholarships')
export class ScholarshipsController {
    constructor(private readonly scholarshipsService: ScholarshipsService) {}

    @Post()
    async create(@Body() createScholarshipDto: CreateScholarshipDto) {
        console.log(createScholarshipDto); // Log the received data
        return this.scholarshipsService.create(createScholarshipDto);
    }
    @Get()
    async findAll(): Promise<Scholarship[]> {
        return this.scholarshipsService.findAll();
    }
}
