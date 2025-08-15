"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problemsAdminController_1 = require("../../controllers/admin/problemsAdminController");
const problemAdminService_1 = require("../../services/admin/problemAdminService");
const ProblemRepository_1 = require("../../repositories/ProblemRepository");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const problemRepository = new ProblemRepository_1.ProblemRepository();
const problemService = new problemAdminService_1.ProblemAdminService(problemRepository);
const problemsController = new problemsAdminController_1.ProblemsAdminController(problemService);
router.get('/problems', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), problemsController.getAllProblems.bind(problemsController));
router.get('/problem/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), problemsController.getProblemById.bind(problemsController));
router.post('/problem', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), problemsController.createProblem.bind(problemsController));
router.put('/problem/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), problemsController.updateProblem.bind(problemsController));
router.delete('/problem/:id', auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), problemsController.deleteProblem.bind(problemsController));
exports.default = router;
//# sourceMappingURL=problemsAdminRoutes.js.map