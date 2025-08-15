import { Types } from 'mongoose';
export interface JwtPayload {
    userId: string;
}
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
export interface ITeamMember {
    userId: string;
    username: string;
    avatar: Types.ObjectId | null | undefined | string;
    rank: string;
    ready: boolean;
}
export interface ITeam {
    id: string;
    leader: string;
    mode: string;
    members: ITeamMember[];
    createdAt: Date;
}
export interface IMessageData {
    id: string;
    senderId: string;
    receiverId?: string;
    message: string;
    timestamp: string;
    senderName: string;
    senderAvatar?: Types.ObjectId | null | undefined;
}
export interface IFriendRequestData {
    senderId: string;
    senderName: string;
    senderAvatar?: Types.ObjectId | null | undefined;
    message: string;
}
export interface ITeamInviteData {
    teamId: string;
    senderId: string;
    senderName: string;
    gameMode: string;
    teamSize: number;
    maxSize: number;
}
export interface IStatusUpdateData {
    userId: string;
    status: string;
    game?: string;
    username: string;
    lastSeen?: Date;
}
//# sourceMappingURL=socketTypes.d.ts.map