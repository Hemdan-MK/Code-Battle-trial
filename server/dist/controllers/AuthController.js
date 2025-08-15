"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authSchemas_1 = require("../schemas/authSchemas");
const axios_1 = __importDefault(require("axios"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.loginSchema.parse(req.body);
                const result = await this.authService.login(validatedData);
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.json({ success: result.success, message: result.message, token: result.token, user: result.user, isAdmin: result.isAdmin });
            }
            catch (error) {
                next(error);
            }
        };
        this.signup = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.signupSchema.parse(req.body);
                const result = await this.authService.signup(validatedData);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyOTP = async (req, res, next) => {
            try {
                console.log(req.body);
                const validatedData = authSchemas_1.otpVerificationSchema.parse(req.body);
                if (!validatedData.tempToken) {
                    res.status(401).json({ success: false, message: 'Temp token required' });
                    return;
                }
                const result = await this.authService.verifyOTP(validatedData);
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.json({ success: result.success, message: result.message, token: result.token, user: result.user, isAdmin: result.isAdmin });
            }
            catch (error) {
                next(error);
            }
        };
        this.googleAuth = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.googleAuthSchema.parse(req.body);
                const tokenResponse = await axios_1.default.post('https://oauth2.googleapis.com/token', {
                    code: validatedData.credential,
                    client_id: process.env.VITE_GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: 'http://localhost:5173/auth/google/callback',
                    grant_type: 'authorization_code',
                });
                const { access_token, id_token } = tokenResponse.data;
                const result = await this.authService.googleAuth({ access_token, id_token });
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.json({ success: result.success, message: result.message, token: result.token, user: result.user, isAdmin: result.isAdmin });
                // res.cookie('refreshToken', result.refreshToken, {
                //   httpOnly: true,
                //   secure: process.env.NODE_ENV === 'production', // true in production
                //   maxAge: 7 * 24 * 60 * 60 * 1000 
                // })
            }
            catch (error) {
                next(error);
            }
        };
        this.githubAuth = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.githubAuthSchema.parse(req.body);
                const result = await this.authService.githubAuth({ code: validatedData.code });
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.json({ success: result.success, message: result.message, token: result.token, user: result.user, isAdmin: result.isAdmin });
            }
            catch (error) {
                next(error);
            }
        };
        this.forgotPassword = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.forgotPasswordSchema.parse(req.body);
                const result = await this.authService.forgotPassword(validatedData);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyResetPassword = async (req, res, next) => {
            try {
                console.log('req.body.otp:', req.body.otp);
                console.log('OTP length:', req.body.otp?.length);
                console.log('OTP value:', JSON.stringify(req.body.otp));
                const validatedData = authSchemas_1.verifyResetPasswordSchema.parse(req.body.otp);
                const result = await this.authService.verifyResetPassword(validatedData, req.body.tempToken);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.resetNewPassword = async (req, res, next) => {
            try {
                const validatedData = authSchemas_1.newPasswordSchema.parse(req.body);
                const result = await this.authService.resetNewPassword(validatedData.password, req.body.tempToken);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.resendOTP = async (req, res, next) => {
            try {
                console.log(req.body);
                const validatedData = authSchemas_1.resendOTPSchema.parse(req.body);
                const tempToken = validatedData.tempToken;
                if (!tempToken) {
                    res.status(401).json({ success: false, message: 'Temp token required' });
                    return;
                }
                const result = await this.authService.resendOTP(validatedData);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.refreshToken = async (req, res, next) => {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    res.status(401).json({ success: false, message: 'Refresh token not found' });
                    return;
                }
                const result = await this.authService.refreshToken(refreshToken);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map