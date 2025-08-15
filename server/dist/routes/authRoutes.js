"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const AuthService_1 = require("../services/auth/AuthService");
const UserRepository_1 = require("../repositories/UserRepository");
const OTPRepository_1 = require("../repositories/OTPRepository");
const EmailService_1 = require("../services/auth/EmailService");
const SMSService_1 = require("../services/auth/SMSService");
const GoogleAuthService_1 = require("../services/auth/GoogleAuthService");
const GitHubAuthService_1 = require("../services/auth/GitHubAuthService");
const TokenService_1 = require("../services/token/TokenService");
const router = (0, express_1.Router)();
// Initialize dependencies
const userRepository = new UserRepository_1.UserRepository();
const otpRepository = new OTPRepository_1.OTPRepository();
const emailService = new EmailService_1.EmailService();
const smsService = new SMSService_1.SMSService();
const googleAuthService = new GoogleAuthService_1.GoogleAuthService();
const githubAuthService = new GitHubAuthService_1.GitHubAuthService();
const tokenService = new TokenService_1.TokenService();
const authService = new AuthService_1.AuthService(userRepository, otpRepository, emailService, smsService, googleAuthService, githubAuthService, tokenService);
const authController = new AuthController_1.AuthController(authService);
// Routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/otp-sign', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/google', authController.googleAuth);
router.post('/github', authController.githubAuth);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-reset-code', authController.verifyResetPassword);
router.post('/reset-new-password', authController.resetNewPassword);
router.post('/resend-reset-code', authController.resendOTP);
router.post('/refresh-token', authController.refreshToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map