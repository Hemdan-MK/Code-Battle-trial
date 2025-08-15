"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const levelsAdminController_1 = require("../../controllers/admin/levelsAdminController");
const levelAdminService_1 = require("../../services/admin/levelAdminService");
const LevelRepository_1 = require("../../repositories/LevelRepository");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const levelRepository = new LevelRepository_1.LevelRepository();
const levelService = new levelAdminService_1.LevelAdminService(levelRepository);
const levelsController = new levelsAdminController_1.LevelsAdminController(levelService);
router.get('/levels', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), levelsController.getAllLevels.bind(levelsController));
router.get('/level/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), levelsController.getLevelById.bind(levelsController));
router.post('/level', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), levelsController.createLevel.bind(levelsController));
router.put('/level/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), levelsController.updateLevel.bind(levelsController));
router.delete('/level/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), levelsController.deleteLevel.bind(levelsController));
exports.default = router;
//# sourceMappingURL=levelsAdminRoutes.js.map