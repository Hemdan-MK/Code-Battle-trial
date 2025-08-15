import { UserRepository } from '../../repositories/UserRepository';
import { ProblemRepository } from '../../repositories/ProblemRepository';
import { RewardRepository } from '../../repositories/RewardRepository';
export declare class DashboardAdminService {
    private userRepository;
    private problemRepository;
    private rewardRepository;
    constructor(userRepository: UserRepository, problemRepository: ProblemRepository, rewardRepository: RewardRepository);
    getDashboardStats(): Promise<{
        userStats: import("../../types").UserStats;
    }>;
}
//# sourceMappingURL=dashboardAdminService.d.ts.map