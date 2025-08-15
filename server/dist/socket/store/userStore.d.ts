import { Types } from 'mongoose';
export interface IActiveUser {
    socketId: string;
    username: string;
    tag: string;
    currentAvatar: Types.ObjectId | null | undefined;
    status: 'online' | 'offline';
    currentGame?: "In Game" | "Available";
    lastSeen: Date;
}
export interface IFriendInfo {
    id: string;
    username: string;
    currentAvatar?: Types.ObjectId | null;
    status: string;
    currentGame: string;
    rank: string;
    lastSeen?: Date;
}
export declare const activeUsers: Map<string, IActiveUser>;
export declare const userRooms: Map<string, string>;
export declare const activeTeams: Map<any, any>;
export declare const userTeams: Map<any, any>;
//# sourceMappingURL=userStore.d.ts.map