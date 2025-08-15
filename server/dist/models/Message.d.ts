import mongoose, { Document, Model } from 'mongoose';
export interface IMessage extends Document {
    content: string;
    senderId: mongoose.Types.ObjectId;
    senderName: string;
    senderAvatar?: string;
    messageType: 'private' | 'team';
    receiverId?: mongoose.Types.ObjectId;
    teamId?: string;
    isRead: boolean;
    isDeleted: boolean;
    deleteAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    markAsRead(): Promise<IMessage>;
}
interface IMessageModel extends Model<IMessage> {
    getPrivateChat(userId1: string, userId2: string, limit?: number): Promise<IMessage[]>;
    getTeamChat(teamId: string, limit?: number): Promise<IMessage[]>;
    deleteTeamMessagesForUser(teamId: string, userId: string): Promise<any>;
    deleteAllTeamMessages(teamId: string): Promise<any>;
    deletePrivateMessagesForUser(userId: string): Promise<any>;
}
declare const Message: IMessageModel;
export default Message;
//# sourceMappingURL=Message.d.ts.map