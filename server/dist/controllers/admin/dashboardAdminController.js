"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAdminController = void 0;
class DashboardAdminController {
    constructor(dashboardAdminService) {
        this.dashboardAdminService = dashboardAdminService;
    }
    async getDashboardStats(req, res) {
        try {
            const stats = await this.dashboardAdminService.getDashboardStats();
            res.status(200).json(stats);
        }
        catch (error) {
            res.status(500).json({ message: 'Error getting dashboard stats', error });
        }
    }
}
exports.DashboardAdminController = DashboardAdminController;
//# sourceMappingURL=dashboardAdminController.js.map