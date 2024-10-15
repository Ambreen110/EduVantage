export class CreateApplicationRequirementDto {
  offerLetterDuration: string;
  depositDetails: string;
  otherRequirement?: string;
  academicRequirement?: string; // New field for academic requirements
}
