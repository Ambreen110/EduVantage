import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University } from './university.schema';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { ApplicationRequirements } from 'src/application-requirements/application-requirements.schema';
import { Scholarship } from 'src/scholarships/scholarship.schema';
import { Program } from 'src/programs/program.schema';

@Injectable()
export class ImportService {
  constructor(
    @InjectModel(University.name) private universityModel: Model<University>,
    @InjectModel(ApplicationRequirements.name) private applicationRequirementsModel: Model<ApplicationRequirements>,
    @InjectModel(Scholarship.name) private scholarshipModel: Model<Scholarship>,
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  private cleanInitialDeposit(value: string): number | null {
    if (!value || value.toUpperCase() === 'N/A') return null; // Return null for 'N/A'
    return parseFloat(value.replace(/[^0-9.]/g, ''));
  }

  private parseLanguageRequirements(languages: string): Record<string, string | null> {
    const requirements: Record<string, string | null> = {
      IELTS: null,
      TOEFL: null,
      Duolingo: null,
      PTE: null,
    };
  
    console.log('Languages string:', languages); // Log the raw input
  
    // Regex to capture the language tests and their associated scores, whether in () or after :
    const languagePairs = languages.split(',').map((lang) => lang.trim());
    
    // Enhanced regex pattern to match patterns like "IELTS: 6.5", "IELTS (6.5)", "TOEFL 80", etc.
    const regex = /(IELTS|TOEFL|Duolingo|PTE)[^\d]*([\d.]+)/i;
  
    languagePairs.forEach((pair) => {
      console.log('Processing pair:', pair); // Log each pair
  
      const match = pair.match(regex);
  
      if (match) {
        const key = match[1]; // Capture the test name (IELTS, TOEFL, etc.)
        const value = match[2]; // Capture the number (score)
  
        console.log('Match found:', { key, value }); // Log matches
  
        if (Object.keys(requirements).includes(key)) {
          requirements[key] = value; // Assign the parsed value
        } else {
          console.error(`Unexpected key encountered: ${key}`); // Log unexpected key
        }
      } else {
        console.log('No match found for pair:', pair); // Log if no match
      }
    });
  
    return requirements;
  }
  
  
  

  async importUniversitiesFromCSV(filePath: string): Promise<void> {
    const universitiesMap: Record<string, any> = {}; // Create a map to hold universities
    const applicationRequirementsList = [];
    const scholarshipList = [];
    const programList = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: '\t' })) // Adjust separator if necessary
      .on('data', (row) => {
        console.log('Row read from CSV:', row); // Log the row for debugging
  
        // Create application requirements instance
        const applicationRequirements = new this.applicationRequirementsModel({
          academicRequirement: row['Academic Requirements'],
          depositDetails: row['Initial Deposit'],
          offerLetterDuration: row['Offer Letter Duration'],
          otherRequirement: row['Other Requirements'],
        });
  
        applicationRequirementsList.push(applicationRequirements);
  
        // Create scholarship instance
        const scholarship = new this.scholarshipModel({
          name: row['Scholarship'],
          amount: row['Amount'],
          eligibility: row['Eligibility'],
        });
  
        scholarshipList.push(scholarship);
  
        // Parse language requirements from the CSV
        const englishLanguageTest = this.parseLanguageRequirements(row['Language Requirements']);
  
        // Create program instance
        const program = new this.programModel({
          type: row['Program Type'] || 'Unknown Program Type', // Provide a default value
          englishLanguageTest, // Assign the parsed englishLanguageTest field
          name: row['Program'], // Assuming program name is in the CSV
          duration: row['Program Duration'], // Adjust according to your CSV
          initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']) || 0, // Clean initialDeposit
        });
  
        programList.push(program);
  
        // Create university instance if it doesn't exist in the map
        const universityName = row['University'];
        if (!universitiesMap[universityName]) {
          universitiesMap[universityName] = {
            name: universityName,
            country: 'USA',
            place: row['City/State'],
            feeStructure: {
              tuitionFee: row['Tuition Fee'],
              initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']), // Clean 'Initial Deposit'
            },
            applicationRequirements: applicationRequirements, // This will be set later
            scholarship: scholarship, // This will be set later
            programs: [], // Initialize as empty, will set later
          };
        }
  
        // Add the program ID to the university's program list
        universitiesMap[universityName].programs.push(program);
      })
      .on('end', async () => {
        // Save application requirements, scholarships, and programs to the database
        const savedApplicationRequirements = await this.applicationRequirementsModel.insertMany(applicationRequirementsList);
        const savedScholarships = await this.scholarshipModel.insertMany(scholarshipList);
        const savedPrograms = await this.programModel.insertMany(programList); // Save programs
  
        // Map saved IDs to the universities
        const savedUniversities = Object.values(universitiesMap).map((university, index) => ({
          ...university,
          applicationRequirements: savedApplicationRequirements[index]._id, // Set reference
          scholarship: savedScholarships[index]._id, // Set reference
          programs: university.programs.map((program) => program._id), // Set specific program references
        }));
  
        await this.universityModel.insertMany(savedUniversities);
        console.log('CSV file successfully processed and data imported');
      })
      .on('error', (error) => {
        console.error(`Error reading CSV file: ${error.message}`);
      });
  }
  
}
