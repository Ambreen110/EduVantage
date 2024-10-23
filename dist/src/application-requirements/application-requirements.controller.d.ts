import { ApplicationRequirementsService } from './application-requirements.service';
import { CreateApplicationRequirementDto } from './dto/create-application-requirement.dto';
export declare class ApplicationRequirementsController {
    private readonly appReqService;
    constructor(appReqService: ApplicationRequirementsService);
    create(createAppReqDto: CreateApplicationRequirementDto): Promise<import("./application-requirements.schema").ApplicationRequirements>;
    findAll(): Promise<import("./application-requirements.schema").ApplicationRequirements[]>;
    search(query: string): Promise<import("./application-requirements.schema").ApplicationRequirements[]>;
    findById(id: string): Promise<import("./application-requirements.schema").ApplicationRequirements>;
    update(id: string, updateData: Partial<CreateApplicationRequirementDto>): Promise<import("./application-requirements.schema").ApplicationRequirements>;
    delete(id: string): Promise<any>;
}
