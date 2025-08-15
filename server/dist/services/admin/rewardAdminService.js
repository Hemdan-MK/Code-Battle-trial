"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardAdminService = void 0;
class RewardAdminService {
    constructor(rewardRepository) {
        this.rewardRepository = rewardRepository;
    }
    async createReward(data) {
        return await this.rewardRepository.create(data);
    }
    async getRewardById(id) {
        return await this.rewardRepository.findById(id);
    }
    async getAllRewards() {
        return await this.rewardRepository.findAll();
    }
    async updateReward(id, data) {
        return await this.rewardRepository.update(id, data);
    }
    async deleteReward(id) {
        await this.rewardRepository.delete(id);
    }
}
exports.RewardAdminService = RewardAdminService;
//# sourceMappingURL=rewardAdminService.js.map