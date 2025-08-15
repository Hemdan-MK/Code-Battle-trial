import { ProblemRepository } from '../../repositories/ProblemRepository';
import { IProblem } from '../../models/interfaces/Index';
export declare class ProblemAdminService {
    private problemRepository;
    constructor(problemRepository: ProblemRepository);
    createProblem(data: Partial<IProblem>): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getAllProblems(): Promise<IProblem[]>;
    updateProblem(id: string, data: Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<void>;
}
//# sourceMappingURL=problemAdminService.d.ts.map