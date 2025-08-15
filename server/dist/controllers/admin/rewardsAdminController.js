"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsAdminController = void 0;
class RewardsAdminController {
    constructor(rewardAdminService) {
        this.rewardAdminService = rewardAdminService;
    }
    async createReward(req, res) {
        try {
            const reward = await this.rewardAdminService.createReward(req.body);
            res.status(201).json(reward);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating reward', error });
        }
    }
    async getRewardById(req, res) {
        try {
            const reward = await this.rewardAdminService.getRewardById(req.params.id);
            if (reward) {
                res.status(200).json(reward);
            }
            else {
                res.status(404).json({ message: 'Reward not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error getting reward', error });
        }
    }
    async getAllRewards(req, res) {
        try {
            const rewards = await this.rewardAdminService.getAllRewards();
            res.status(200).json(rewards);
        }
        catch (error) {
            res.status(500).json({ message: 'Error getting rewards', error });
        }
    }
    async updateReward(req, res) {
        try {
            const reward = await this.rewardAdminService.updateReward(req.params.id, req.body);
            if (reward) {
                res.status(200).json(reward);
            }
            else {
                res.status(404).json({ message: 'Reward not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating reward', error });
        }
    }
    async deleteReward(req, res) {
        try {
            await this.rewardAdminService.deleteReward(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting reward', error });
        }
    }
}
exports.RewardsAdminController = RewardsAdminController;
//# sourceMappingURL=rewardsAdminController.js.map