import { Request, Response } from 'express';
import { DashboardAdminService } from '../../services/admin/dashboardAdminService';
export declare class DashboardAdminController {
    private dashboardAdminService;
    constructor(dashboardAdminService: DashboardAdminService);
    getDashboardStats(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=dashboardAdminController.d.ts.map