import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}, {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}>;
export declare const otpVerificationSchema: z.ZodObject<{
    otp: z.ZodString;
    tempToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
    tempToken: string;
}, {
    otp: string;
    tempToken: string;
}>;
export declare const resendOTPSchema: z.ZodObject<{
    where: z.ZodEnum<["signUp", "forgot"]>;
    tempToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tempToken: string;
    where: "forgot" | "signUp";
}, {
    tempToken: string;
    where: "forgot" | "signUp";
}>;
export declare const googleAuthSchema: z.ZodObject<{
    credential: z.ZodString;
}, "strip", z.ZodTypeAny, {
    credential: string;
}, {
    credential: string;
}>;
export declare const githubAuthSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const verifyResetPasswordSchema: z.ZodString;
export declare const newPasswordSchema: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
}, {
    password: string;
}>;
export declare const updateUsername: z.ZodObject<{
    username: z.ZodString;
    tag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    tag: string;
}, {
    username: string;
    tag: string;
}>;
export declare const updatePassword: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
//# sourceMappingURL=authSchemas.d.ts.map