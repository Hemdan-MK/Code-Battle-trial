import { Router } from 'express';
import { authenticateToken, checkRole } from '../../middleware/auth';
import { DashboardAdminController } from '../../controllers/admin/dashboardAdminController';
import { DashboardAdminService } from '../../services/admin/dashboardAdminService';
import { UserRepository } from '../../repositories/UserRepository';
import { ProblemRepository } from '../../repositories/ProblemRepository';
import { RewardRepository } from '../../repositories/RewardRepository';
import { LevelRepository } from '../../repositories/LevelRepository';

const router = Router();
const userRepository = new UserRepository();
const problemRepository = new ProblemRepository();
const rewardRepository = new RewardRepository();
const levelRepository = new LevelRepository();

const dashboardService = new DashboardAdminService(
  userRepository,
  problemRepository,
  rewardRepository,
  levelRepository,
);
const dashboardController = new DashboardAdminController(dashboardService);

router.get('/admin/dashboard/stats', authenticateToken, checkRole('admin'), dashboardController.getStats.bind(dashboardController));

export default router;
