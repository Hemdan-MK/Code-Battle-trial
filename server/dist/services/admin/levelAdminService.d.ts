import { LevelRepository } from '../../repositories/LevelRepository';
import { ILevel } from '../../models/interfaces/Index';
export declare class LevelAdminService {
    private levelRepository;
    constructor(levelRepository: LevelRepository);
    createLevel(data: Partial<ILevel>): Promise<ILevel>;
    getLevelById(id: string): Promise<ILevel | null>;
    getAllLevels(): Promise<ILevel[]>;
    updateLevel(id: string, data: Partial<ILevel>): Promise<ILevel | null>;
    deleteLevel(id: string): Promise<void>;
}
//# sourceMappingURL=levelAdminService.d.ts.map