import { UserRepository } from '../../repositories/UserRepository';
import { ProblemRepository } from '../../repositories/ProblemRepository';
import { RewardRepository } from '../../repositories/RewardRepository';
import { LevelRepository } from '../../repositories/LevelRepository';

export class DashboardAdminService {
    constructor(
        private userRepository: UserRepository,
        private problemRepository: ProblemRepository,
        private rewardRepository: RewardRepository,
        private levelRepository: LevelRepository,
    ) {}

    async getDashboardStats() {
        const userStats = await this.userRepository.getUserStats();
        const problemStats = await this.problemRepository.getProblemStats();
        const rewardStats = await this.rewardRepository.getRewardStats();
        const levelStats = await this.levelRepository.getLevelStats();

        return {
            userStats,
            problemStats,
            rewardStats,
            levelStats,
        };
    }
}
