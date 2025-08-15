"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rewardsAdminController_1 = require("../../controllers/admin/rewardsAdminController");
const rewardAdminService_1 = require("../../services/admin/rewardAdminService");
const RewardRepository_1 = require("../../repositories/RewardRepository");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const rewardRepository = new RewardRepository_1.RewardRepository();
const rewardService = new rewardAdminService_1.RewardAdminService(rewardRepository);
const rewardsController = new rewardsAdminController_1.RewardsAdminController(rewardService);
router.get('/rewards', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), rewardsController.getAllRewards.bind(rewardsController));
router.get('/reward/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), rewardsController.getRewardById.bind(rewardsController));
router.post('/reward', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), rewardsController.createReward.bind(rewardsController));
router.put('/reward/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), rewardsController.updateReward.bind(rewardsController));
router.delete('/reward/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), rewardsController.deleteReward.bind(rewardsController));
exports.default = router;
//# sourceMappingURL=rewardsAdminRoutes.js.map