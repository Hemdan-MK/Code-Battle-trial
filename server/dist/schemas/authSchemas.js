"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUsername = exports.newPasswordSchema = exports.verifyResetPasswordSchema = exports.forgotPasswordSchema = exports.githubAuthSchema = exports.googleAuthSchema = exports.resendOTPSchema = exports.otpVerificationSchema = exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters')
});
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    phoneNumber: zod_1.z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
});
exports.otpVerificationSchema = zod_1.z.object({
    otp: zod_1.z.string().length(6, 'OTP must be 6 digits'),
    tempToken: zod_1.z.string().min(1, "Token is required"),
});
exports.resendOTPSchema = zod_1.z.object({
    where: zod_1.z.enum(['signUp', 'forgot']),
    tempToken: zod_1.z.string().min(1, "Token is required"),
});
exports.googleAuthSchema = zod_1.z.object({
    credential: zod_1.z.string().min(1, 'Google Credential (code) is required'),
});
exports.githubAuthSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'GitHub authorization code is required')
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
});
exports.verifyResetPasswordSchema = zod_1.z.string().length(6, 'OTP must be 6 digits');
exports.newPasswordSchema = zod_1.z.object({
    password: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
});
exports.updateUsername = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    tag: zod_1.z.string()
        .min(2, 'Tag must be at least 2 characters')
});
exports.updatePassword = zod_1.z.object({
    currentPassword: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    newPassword: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
});
//# sourceMappingURL=authSchemas.js.map