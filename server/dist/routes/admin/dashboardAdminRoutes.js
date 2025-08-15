"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardAdminController_1 = require("../../controllers/admin/dashboardAdminController");
const dashboardAdminService_1 = require("../../services/admin/dashboardAdminService");
const UserRepository_1 = require("../../repositories/UserRepository");
const ProblemRepository_1 = require("../../repositories/ProblemRepository");
const RewardRepository_1 = require("../../repositories/RewardRepository");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const userRepository = new UserRepository_1.UserRepository();
const problemRepository = new ProblemRepository_1.ProblemRepository();
const rewardRepository = new RewardRepository_1.RewardRepository();
const dashboardService = new dashboardAdminService_1.DashboardAdminService(userRepository, problemRepository, rewardRepository);
const dashboardController = new dashboardAdminController_1.DashboardAdminController(dashboardService);
router.get('/dashboard/stats', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), dashboardController.getDashboardStats.bind(dashboardController));
exports.default = router;
//# sourceMappingURL=dashboardAdminRoutes.js.map