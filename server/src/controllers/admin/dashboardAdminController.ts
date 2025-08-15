import { Request, Response } from 'express';
import { DashboardAdminService } from '../../services/admin/dashboardAdminService';

export class DashboardAdminController {
  constructor(private dashboardService: DashboardAdminService) {}

  async getStats(req: Request, res: Response) {
    try {
      const stats = await this.dashboardService.getDashboardStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
  }
}
