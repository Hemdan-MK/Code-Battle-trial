"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
class AuthService {
    constructor(userRepository, otpRepository, emailService, smsService, googleAuthService, githubAuthService, tokenService) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.googleAuthService = googleAuthService;
        this.githubAuthService = githubAuthService;
        this.tokenService = tokenService;
    }
    async login(data) {
        const { email, password } = data;
        // Find user with password
        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        console.log(user);
        // Check password
        if (!user.password) {
            throw new Error('Please login with your OAuth provider');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials pass');
        }
        // Check if user is verified
        if (!user.isEmailVerified) {
            throw new Error('Please verify your email before logging in');
        }
        if (user.isBanned) {
            throw new Error('Banned user');
        }
        // Generate tokens
        const token = this.tokenService.generateAccessToken(user._id);
        const refreshToken = this.tokenService.generateRefreshToken(user._id);
        return {
            success: true,
            message: 'Login successful',
            token,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            },
            isAdmin: user.role === "admin"
        };
    }
    async signup(data) {
        const { username, email, password, phoneNumber } = data;
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const existingUsername = await this.userRepository.findByUsername(username);
        if (existingUsername) {
            throw new Error('Username is already taken');
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        // Create user
        const user = await this.userRepository.create({
            email,
            username,
            phone: Number(phoneNumber),
            password: hashedPassword,
            isEmailVerified: false,
            isPhoneVerified: false
        });
        // Generate and send OTP
        const session = "signUp";
        await this.generateAndSendOTP(user._id, session);
        await this.generateAndSendOTP(user._id, session);
        // Generate temp token
        const tempToken = this.tokenService.generateTempToken(user._id);
        return {
            success: true,
            message: "Signup initialize successfully",
            tempToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            }
        };
    }
    async verifyOTP(data) {
        const { otp, tempToken } = data;
        // Verify temp token
        const decoded = jsonwebtoken_1.default.verify(tempToken, process.env.JWT_TEMP_SECRET);
        const userId = decoded.userId;
        console.log(userId);
        // Find OTP
        const otpRecord = await this.otpRepository.findByUserIdAndType(userId.toString());
        console.log(otpRecord);
        if (!otpRecord) {
            throw new Error('OTP not found or expired');
        }
        // Verify OTP
        if (otpRecord.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        // Get user
        const user = await this.userRepository.findById(userId.toString());
        if (!user) {
            throw new Error('User not found');
        }
        // Update verification status
        const updates = {};
        updates.isEmailVerified = true;
        await this.userRepository.update(userId.toString(), updates);
        // Delete OTP
        await this.otpRepository.deleteByUserIdAndType(userId.toString());
        // Generate tokens
        const token = this.tokenService.generateAccessToken(userId.toString());
        const refreshToken = this.tokenService.generateRefreshToken(userId.toString());
        return {
            success: true,
            message: 'OTP verified successfully',
            token,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            }
        };
    }
    async resendOTP(data) {
        const { tempToken, where } = data;
        // Verify temp token
        const decoded = jsonwebtoken_1.default.verify(tempToken, process.env.JWT_TEMP_SECRET);
        const userId = decoded.userId;
        // Generate and send new OTP
        await this.generateAndSendOTP(userId.toString(), where);
        return {
            success: true,
            message: "Resend OTP Success"
        };
    }
    async googleAuth({ access_token, id_token }) {
        const { data: googleUser } = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userData = {
            email: googleUser.email,
            username: googleUser.name,
            picture: googleUser.picture,
            googleId: googleUser.sub,
        };
        // Check if user exists
        let user = await this.userRepository.findByGoogleId(userData.googleId);
        if (!user) {
            // Check if user exists with same email
            user = await this.userRepository.findByEmail(userData.email);
            if (user) {
                // Link Google account
                await this.userRepository.update(user._id, { googleId: userData.googleId });
            }
            else {
                // Create new user
                user = await this.userRepository.create({
                    email: userData.email,
                    username: userData.email.split('@')[0],
                    phone: 0, // change in edit
                    googleId: googleUser.sub,
                    isEmailVerified: true
                });
            }
        }
        if (user.isBanned) {
            throw new Error('Banned user');
        }
        // Generate token
        const token = this.tokenService.generateAccessToken(user._id);
        const refreshToken = this.tokenService.generateRefreshToken(user._id);
        return {
            success: true,
            message: 'Google authentication successful',
            token,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            },
            isAdmin: user.role === "admin"
        };
    }
    async githubAuth(data) {
        const { code } = data;
        // Exchange code for access token and get user info
        // const githubUser = await this.githubAuthService.exchangeCode(code);
        const tokenResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.VITE_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: {
                Accept: 'application/json',
            },
        });
        const accessToken = tokenResponse.data.access_token;
        if (!accessToken)
            throw new Error('Failed to get GitHub access token');
        // 2. Get user info from GitHub
        const userResponse = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const githubUser = userResponse.data;
        // Check if user exists
        let user = await this.userRepository.findByGithubId(githubUser.id.toString());
        if (!user) {
            // Check if user exists with same email
            if (githubUser.email) {
                user = await this.userRepository.findByEmail(githubUser.email);
            }
            if (user) {
                // Link GitHub account
                await this.userRepository.update(user._id, { githubId: githubUser.id.toString() });
            }
            else {
                // Create new user
                user = await this.userRepository.create({
                    email: githubUser.email || '',
                    username: githubUser.login,
                    phone: 0,
                    githubId: githubUser.id.toString(),
                    isEmailVerified: !!githubUser.email
                });
            }
        }
        // Generate token
        const token = this.tokenService.generateAccessToken(user._id);
        const refreshToken = this.tokenService.generateRefreshToken(user._id);
        return {
            success: true,
            message: 'GitHub authentication successful',
            token,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            },
            isAdmin: user.role === "admin"
        };
    }
    async generateAndSendOTP(userId, session) {
        // Delete existing OTP
        await this.otpRepository.deleteByUserIdAndType(userId);
        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Save OTP
        await this.otpRepository.create({
            userId,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        });
        // Get user
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Send OTP
        await this.emailService.sendOTP(user.email, otp, session);
    }
    async forgotPassword(data) {
        const { email } = data;
        const check = await this.userRepository.findByEmail(email);
        if (!check) {
            return {
                success: true,
                message: 'Email Verification successful',
                userExists: false
            };
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const session = 'forgot';
        await this.generateAndSendOTP(user._id, session);
        const tempToken = this.tokenService.generateTempToken(user._id);
        return {
            success: true,
            message: 'Email Verification successful',
            tempToken,
            userExists: true
        };
    }
    async verifyResetPassword(otp, tempToken) {
        // Verify temp token
        const decoded = jsonwebtoken_1.default.verify(tempToken, process.env.JWT_TEMP_SECRET);
        const userId = decoded.userId;
        // Find OTP
        const otpRecord = await this.otpRepository.findByUserIdAndType(userId.toString());
        if (!otpRecord) {
            throw new Error('OTP not found or expired');
        }
        // Verify OTP
        if (otpRecord.otp !== otp) {
            return {
                success: true,
                message: 'OTP verification unsuccessfully',
                isCorrect: false
            };
        }
        // Delete OTP
        await this.otpRepository.deleteByUserIdAndType(userId.toString());
        return {
            success: true,
            message: 'OTP verified successfully',
            isCorrect: true
        };
    }
    async refreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
            const userId = decoded.userId;
            const newAccessToken = this.tokenService.generateAccessToken(userId.toString());
            return {
                success: true,
                token: newAccessToken
            };
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async resetNewPassword(password, tempToken) {
        // Verify temp token
        const decoded = jsonwebtoken_1.default.verify(tempToken, process.env.JWT_TEMP_SECRET);
        const userId = decoded.userId;
        const user = await this.userRepository.findById(userId.toString());
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const updatedUser = await this.userRepository.update(userId.toString(), {
            password: hashedPassword
        });
        if (!updatedUser) {
            throw new Error('Failed to update password');
        }
        return {
            success: true,
            message: 'Password reset successfully',
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map