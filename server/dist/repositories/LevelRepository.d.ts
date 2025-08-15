import { ILevel } from '../models/interfaces/Index';
export declare class LevelRepository {
    create(data: Partial<ILevel>): Promise<ILevel>;
    findById(id: string): Promise<ILevel | null>;
    findByLevel(level: number): Promise<ILevel | null>;
    findAll(): Promise<ILevel[]>;
    update(id: string, data: Partial<ILevel>): Promise<ILevel | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=LevelRepository.d.ts.map