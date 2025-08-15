import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../../services/user/profileService';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    details: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
    updateUsername: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
    updatePassword: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
    addPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
    getMatchHistory: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
//# sourceMappingURL=profileController.d.ts.map