"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.OTP_LENGTH = exports.OTP_EXPIRES_IN_MINUTES = exports.JWT_TEMP_EXPIRES_IN = exports.JWT_REFRESH_EXPIRES_IN = exports.JWT_EXPIRES_IN = void 0;
exports.JWT_EXPIRES_IN = '1h';
exports.JWT_REFRESH_EXPIRES_IN = '7d';
exports.JWT_TEMP_EXPIRES_IN = '1h';
exports.OTP_EXPIRES_IN_MINUTES = 10;
exports.OTP_LENGTH = 6;
exports.ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User with this email already exists',
    USERNAME_TAKEN: 'Username is already taken',
    INVALID_OTP: 'Invalid OTP',
    OTP_EXPIRED: 'OTP expired',
    EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
    TEMP_TOKEN_REQUIRED: 'Temporary token required',
    ACCESS_TOKEN_REQUIRED: 'Access token required',
    INVALID_TOKEN: 'Invalid or expired token',
    GOOGLE_AUTH_FAILED: 'Google authentication failed',
    GITHUB_AUTH_FAILED: 'GitHub authentication failed'
};
//# sourceMappingURL=constants.js.map