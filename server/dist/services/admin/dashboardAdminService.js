"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAdminService = void 0;
class DashboardAdminService {
    constructor(userRepository, problemRepository, rewardRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.rewardRepository = rewardRepository;
    }
    async getDashboardStats() {
        const userStats = await this.userRepository.getUserStats();
        // TODO: Get other stats
        return {
            userStats
        };
    }
}
exports.DashboardAdminService = DashboardAdminService;
//# sourceMappingURL=dashboardAdminService.js.map