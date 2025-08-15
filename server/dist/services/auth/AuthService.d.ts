import { IUserRepository, IOTPRepository } from '../../repositories/interfaces/index';
import { IGitHubAuthService } from '../../types/interfaces/IGitHubAuthService';
import { ITokenService } from '../../types/interfaces/ITokenService';
import { LoginRequest, SignupRequest, OTPVerificationRequest, ResendOTPRequest, GoogleAuthRequest, GitHubAuthRequest, forgotPassword, SignupResponse, AuthResponse } from '../../types/index';
import { IAuthService } from '../../types/interfaces/IAuthService';
import { IEmailService } from '../../types/interfaces/IEmailService';
import { IGoogleAuthService } from '../../types/interfaces/IGoogleAuthService';
import { ISMSService } from '../../types/interfaces/ISMSService';
export declare class AuthService implements IAuthService {
    private userRepository;
    private otpRepository;
    private emailService;
    private smsService;
    private googleAuthService;
    private githubAuthService;
    private tokenService;
    constructor(userRepository: IUserRepository, otpRepository: IOTPRepository, emailService: IEmailService, smsService: ISMSService, googleAuthService: IGoogleAuthService, githubAuthService: IGitHubAuthService, tokenService: ITokenService);
    login(data: LoginRequest): Promise<AuthResponse>;
    signup(data: SignupRequest): Promise<SignupResponse>;
    verifyOTP(data: OTPVerificationRequest): Promise<AuthResponse>;
    resendOTP(data: ResendOTPRequest): Promise<{
        success: boolean;
        message: string;
    }>;
    googleAuth({ access_token, id_token }: GoogleAuthRequest): Promise<AuthResponse>;
    githubAuth(data: GitHubAuthRequest): Promise<AuthResponse>;
    private generateAndSendOTP;
    forgotPassword(data: forgotPassword): Promise<{
        success: boolean;
        message: string;
        userExists: boolean;
        tempToken?: string;
    }>;
    verifyResetPassword(otp: string, tempToken: string): Promise<{
        success: boolean;
        isCorrect: boolean;
        message: string;
    }>;
    refreshToken(token: string): Promise<{
        success: boolean;
        token: string;
    }>;
    resetNewPassword(password: string, tempToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=AuthService.d.ts.map