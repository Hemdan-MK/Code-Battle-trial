import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../types/interfaces/IAuthService';
export declare class AuthController {
    private authService;
    constructor(authService: IAuthService);
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    googleAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    githubAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyResetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resetNewPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resendOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map