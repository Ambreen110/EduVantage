import { Body, Controller, Post } from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto'; // Adjust the path as necessary
import { ScholarshipsService } from './scholarships.service';

@Controller('scholarships')
export class ScholarshipsController {
    constructor(private readonly scholarshipsService: ScholarshipsService) {}

    @Post()
    async create(@Body() createScholarshipDto: CreateScholarshipDto) {
        console.log(createScholarshipDto); // Log the received data
        return this.scholarshipsService.create(createScholarshipDto);
    }
}
