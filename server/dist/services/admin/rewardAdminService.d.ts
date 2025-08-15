import { RewardRepository } from '../../repositories/RewardRepository';
import { IReward } from '../../models/interfaces/Index';
export declare class RewardAdminService {
    private rewardRepository;
    constructor(rewardRepository: RewardRepository);
    createReward(data: Partial<IReward>): Promise<IReward>;
    getRewardById(id: string): Promise<IReward | null>;
    getAllRewards(): Promise<IReward[]>;
    updateReward(id: string, data: Partial<IReward>): Promise<IReward | null>;
    deleteReward(id: string): Promise<void>;
}
//# sourceMappingURL=rewardAdminService.d.ts.map