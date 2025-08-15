import { IProblem } from '../models/interfaces/Index';
export declare class ProblemRepository {
    create(data: Partial<IProblem>): Promise<IProblem>;
    findById(id: string): Promise<IProblem | null>;
    findAll(): Promise<IProblem[]>;
    update(id: string, data: Partial<IProblem>): Promise<IProblem | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ProblemRepository.d.ts.map