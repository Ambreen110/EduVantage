import { Model } from 'mongoose';
import { ApplicationRequirements } from './application-requirements.schema';
import { CreateApplicationRequirementDto } from './dto/create-application-requirement.dto';
export declare class ApplicationRequirementsService {
    private appReqModel;
    constructor(appReqModel: Model<ApplicationRequirements>);
    create(createApplicationRequirementDto: CreateApplicationRequirementDto): Promise<ApplicationRequirements>;
    findAll(): Promise<ApplicationRequirements[]>;
    findById(id: string): Promise<ApplicationRequirements>;
    update(id: string, updateData: Partial<ApplicationRequirements>): Promise<ApplicationRequirements>;
    delete(id: string): Promise<any>;
    search(query: string): Promise<ApplicationRequirements[]>;
}
