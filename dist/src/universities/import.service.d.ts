import { Model } from 'mongoose';
import { University } from './university.schema';
import { ApplicationRequirements } from 'src/application-requirements/application-requirements.schema';
import { Scholarship } from 'src/scholarships/scholarship.schema';
import { Program } from 'src/programs/program.schema';
export declare class ImportService {
    private universityModel;
    private applicationRequirementsModel;
    private scholarshipModel;
    private programModel;
    constructor(universityModel: Model<University>, applicationRequirementsModel: Model<ApplicationRequirements>, scholarshipModel: Model<Scholarship>, programModel: Model<Program>);
    private cleanInitialDeposit;
    private parseLanguageRequirements;
    importUniversitiesFromCSV(filePath: string): Promise<void>;
}
