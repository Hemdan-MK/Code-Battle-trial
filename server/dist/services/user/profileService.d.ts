import { IUserRepository } from '../../repositories/interfaces';
import { Types } from 'mongoose';
export interface UserProfileResponse {
    username: string;
    tag: string;
    email: string;
    phone: number | null;
    rank: 'unranked' | 'iron' | 'bronze' | 'silver' | 'gold' | 'diamond';
    level?: number;
    xp: number;
    hasPassword?: boolean;
    currentAvatar?: Types.ObjectId | null;
    currentTitle?: string;
    collections?: {
        Avatar: Types.ObjectId[];
        Title: Types.ObjectId[];
    };
    gamePlayed?: number;
    friends: Types.ObjectId[];
    pendingFriendRequests?: Types.ObjectId[];
}
interface Response {
    success: boolean;
    message: string;
}
export declare class ProfileService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    details(token: string): Promise<UserProfileResponse>;
    updateUsername(data: {
        username: string;
        tag: string;
        token: string;
    }): Promise<Response>;
    updatePassword(data: {
        currentPassword: string;
        newPassword: string;
        token: string;
    }): Promise<Response>;
    addPassword(data: {
        newPassword: string;
        token: string;
    }): Promise<Response>;
    getMatchHistory(token: string): Promise<any[]>;
}
export {};
//# sourceMappingURL=profileService.d.ts.map