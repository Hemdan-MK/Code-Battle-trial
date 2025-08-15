"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const twilio_1 = require("twilio");
class SMSService {
    constructor() {
        this.client = new twilio_1.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    async sendOTP(phoneNumber, otp) {
        if (phoneNumber === null) {
            throw new Error('Phone number is required for OTP');
        }
        if (process.env.NODE_ENV === 'development') {
            console.log('=== DEVELOPMENT MODE ===');
            console.log(`📱 Phone: ${phoneNumber}`);
            console.log(`🔐 OTP: ${otp}`);
            console.log('======================');
            return;
        }
        //////////////////////////////
        if (!this.client || !process.env.TWILIO_PHONE_NUMBER) {
            throw new Error('Twilio not configured properly');
        }
        try {
            await this.client.messages.create({
                body: `Your OTP verification code is: ${otp}. This code will expire in 10 minutes.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber.toString()
            });
            console.log(`SMS sent successfully to ${phoneNumber}`);
        }
        catch (error) {
            console.error('Twilio SMS error:', error);
            throw new Error('Failed to send SMS');
        }
    }
}
exports.SMSService = SMSService;
//# sourceMappingURL=SMSService.js.map