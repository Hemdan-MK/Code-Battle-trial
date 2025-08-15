import { Request, Response } from 'express';
import { LevelAdminService } from '../../services/admin/levelAdminService';
export declare class LevelsAdminController {
    private levelAdminService;
    constructor(levelAdminService: LevelAdminService);
    createLevel(req: Request, res: Response): Promise<void>;
    getLevelById(req: Request, res: Response): Promise<void>;
    getAllLevels(req: Request, res: Response): Promise<void>;
    updateLevel(req: Request, res: Response): Promise<void>;
    deleteLevel(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=levelsAdminController.d.ts.map