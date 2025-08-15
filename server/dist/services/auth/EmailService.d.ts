import { IEmailService } from '../../types/interfaces/IEmailService';
export declare class EmailService implements IEmailService {
    private transporter;
    constructor();
    sendOTP(email: string, otp: string, session: "forgot" | "signUp"): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map