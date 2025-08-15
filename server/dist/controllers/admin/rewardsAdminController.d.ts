import { Request, Response } from 'express';
import { RewardAdminService } from '../../services/admin/rewardAdminService';
export declare class RewardsAdminController {
    private rewardAdminService;
    constructor(rewardAdminService: RewardAdminService);
    createReward(req: Request, res: Response): Promise<void>;
    getRewardById(req: Request, res: Response): Promise<void>;
    getAllRewards(req: Request, res: Response): Promise<void>;
    updateReward(req: Request, res: Response): Promise<void>;
    deleteReward(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=rewardsAdminController.d.ts.map