import { ISMSService } from '../../types/interfaces/ISMSService';
export declare class SMSService implements ISMSService {
    private client;
    constructor();
    sendOTP(phoneNumber: string | number | null, otp: string): Promise<void>;
}
//# sourceMappingURL=SMSService.d.ts.map