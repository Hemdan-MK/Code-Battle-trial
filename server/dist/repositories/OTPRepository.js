"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPRepository = void 0;
const OTP_1 = require("../models/OTP");
class OTPRepository {
    async create(otpData) {
        const otp = new OTP_1.OTP(otpData);
        return await otp.save();
    }
    async findByUserIdAndType(userId) {
        return await OTP_1.OTP.findOne({ userId });
    }
    async deleteByUserIdAndType(userId) {
        const result = await OTP_1.OTP.deleteOne({ userId });
        return result.deletedCount > 0;
    }
    async deleteExpired() {
        const result = await OTP_1.OTP.deleteMany({ expiresAt: { $lt: new Date() } });
        return result.deletedCount;
    }
}
exports.OTPRepository = OTPRepository;
//# sourceMappingURL=OTPRepository.js.map