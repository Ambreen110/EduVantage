import { ImportService } from './import.service';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    importUniversities(): Promise<void>;
}
