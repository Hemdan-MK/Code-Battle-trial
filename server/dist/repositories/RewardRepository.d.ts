import { IReward } from '../models/interfaces/Index';
export declare class RewardRepository {
    create(data: Partial<IReward>): Promise<IReward>;
    findById(id: string): Promise<IReward | null>;
    findAll(): Promise<IReward[]>;
    update(id: string, data: Partial<IReward>): Promise<IReward | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=RewardRepository.d.ts.map