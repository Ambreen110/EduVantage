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

    // Check if languages is undefined or empty
    if (!languages) {
        console.error('Languages input is undefined or empty.');
        return requirements; // Return empty requirements or handle as needed
    }

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
  const universitiesMap: Record<string, any> = {};
  const applicationRequirementsList = [];
  const scholarshipList = [];
  const programList = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: '\t' })) // Adjust separator if necessary
    .on('data', (row) => {
      console.log('Row read from CSV:', row); // Log the row for debugging

      // Create application requirements instance if required fields are present
      if (row['Academic Requirements'] && row['Initial Deposit']) {
          const applicationRequirements = new this.applicationRequirementsModel({
              academicRequirement: row['Academic Requirements'],
              depositDetails: row['Initial Deposit'],
              offerLetterDuration: row['Offer Letter Duration'],
              otherRequirement: row['Other Requirements'],
          });
          applicationRequirementsList.push(applicationRequirements);
      } else {
          console.warn('Skipping application requirements due to missing fields:', row);
      }

      // Create scholarship instance if required fields are present
      if (row['Scholarship'] && row['Amount']) {
          const scholarship = new this.scholarshipModel({
              name: row['Scholarship'],
              amount: row['Amount'],
              eligibility: row['Eligibility'],
          });
          scholarshipList.push(scholarship);
      } else {
          console.warn('Skipping scholarship due to missing fields:', row);
      }

      // Parse language requirements from the CSV
      const languages = row['Language Requirements'];
      console.log('Language Requirements from CSV:', languages); // Log the input before parsing
      const englishLanguageTest = this.parseLanguageRequirements(languages);

      // Create program instance if required fields are present
      if (row['Program'] && row['Program Type']) {
          const program = new this.programModel({
              type: row['Program Type'] || 'Unknown Program Type', // Provide a default value
              englishLanguageTest, // Assign the parsed englishLanguageTest field
              name: row['Program'], // Assuming program name is in the CSV
              duration: row['Program Duration'], // Adjust according to your CSV
              initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']) || 0, // Clean initialDeposit
          });
          programList.push(program);
      } else {
          console.warn('Skipping program due to missing fields:', row);
      }

      // Create university instance if it doesn't exist in the map
      const universityName = row['University'];
      if (!universitiesMap[universityName]) {
          universitiesMap[universityName] = {
              name: universityName,
              country: 'UK',
              place: row['City/State'],
              feeStructure: {
                  tuitionFee: row['Tuition Fee'],
                  initialDeposit: this.cleanInitialDeposit(row['Initial Deposit']), // Clean 'Initial Deposit'
              },
              applicationRequirements: null, // This will be set later
              scholarship: null, // This will be set later
              programs: [], // Initialize as empty, will set later
          };
      }

      // Add the program ID to the university's program list
      universitiesMap[universityName].programs.push(Program);
    })
    .on('end', async () => {
      // Save application requirements, scholarships, and programs to the database
      const savedApplicationRequirements = await this.applicationRequirementsModel.insertMany(applicationRequirementsList);
      const savedScholarships = await this.scholarshipModel.insertMany(scholarshipList);
      const savedPrograms = await this.programModel.insertMany(programList); // Save programs

      // Map saved IDs to the universities
      const savedUniversities = Object.values(universitiesMap).map((university, index) => ({
          ...university,
          applicationRequirements: savedApplicationRequirements[index]?._id || null, // Set reference if exists
          scholarship: savedScholarships[index]?._id || null, // Set reference if exists
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
