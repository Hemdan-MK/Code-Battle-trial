import { IGoogleAuthService } from '../../types/interfaces/IGoogleAuthService';
export declare class GoogleAuthService implements IGoogleAuthService {
    private client;
    constructor();
    verifyToken(token: string): Promise<any>;
}
//# sourceMappingURL=GoogleAuthService.d.ts.map