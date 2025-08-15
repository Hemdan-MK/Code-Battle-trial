"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    generateAccessToken(userId) {
        const payload = {
            userId,
            type: 'access'
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    generateRefreshToken(userId) {
        const payload = {
            userId,
            type: 'refresh'
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }
    generateTempToken(userId, purpose = 'otp_verification') {
        const payload = {
            userId,
            type: 'temp',
            purpose
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_TEMP_SECRET, { expiresIn: '1h' });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map