// import.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('universities')
  async importUniversities(): Promise<void> {
    const filePath = 'D:\\works\\Universities backend\\university\\src\\universities\\universities.csv'; // Update to the correct path
    console.log(`File path: ${filePath}`); // Log the file path for confirmation
    await this.importService.importUniversitiesFromCSV(filePath);
  }
  


}