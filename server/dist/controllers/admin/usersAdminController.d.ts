import { Request, Response, NextFunction } from 'express';
import { UserAdminService } from '../../services/admin/userAdminService';
export declare class UsersAdminController {
    private userService;
    constructor(userService: UserAdminService);
    /**
     * Get paginated users with filters
     */
    getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get user by ID
     */
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Create new user
     */
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * edit button modal
     */
    editRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update user
     */
    updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Ban user
     */
    banStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=usersAdminController.d.ts.map