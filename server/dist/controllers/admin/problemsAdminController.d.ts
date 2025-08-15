import { Request, Response } from 'express';
import { ProblemAdminService } from '../../services/admin/problemAdminService';
export declare class ProblemsAdminController {
    private problemAdminService;
    constructor(problemAdminService: ProblemAdminService);
    createProblem(req: Request, res: Response): Promise<void>;
    getProblemById(req: Request, res: Response): Promise<void>;
    getAllProblems(req: Request, res: Response): Promise<void>;
    updateProblem(req: Request, res: Response): Promise<void>;
    deleteProblem(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=problemsAdminController.d.ts.map