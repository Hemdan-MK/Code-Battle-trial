export interface IEmailService {
    sendOTP(email: string, otp: string, session: "forgot" | "signUp"): Promise<void>;
}
//# sourceMappingURL=IEmailService.d.ts.map