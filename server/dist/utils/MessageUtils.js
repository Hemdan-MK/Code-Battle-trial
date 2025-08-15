"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/messageUtils.js
const mongoose_1 = __importDefault(require("mongoose"));
const Message_1 = __importDefault(require("../models/Message")); // Adjust path as needed
class MessageUtils {
    // Get unread message count for a user
    static async getUnreadCount(userId) {
        try {
            const count = await Message_1.default.countDocuments({
                receiverId: userId,
                messageType: 'private',
                isRead: false,
                isDeleted: false
            });
            return count;
        }
        catch (error) {
            console.error('Error getting unread count:', error);
            return 0;
        }
    }
    // Get recent conversations for a user
    static async getRecentConversations(userId, limit = 10) {
        try {
            const recentMessages = await Message_1.default.aggregate([
                {
                    $match: {
                        messageType: 'private',
                        isDeleted: false,
                        $or: [
                            { senderId: new mongoose_1.default.Types.ObjectId(userId) },
                            { receiverId: new mongoose_1.default.Types.ObjectId(userId) }
                        ]
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ['$senderId', new mongoose_1.default.Types.ObjectId(userId)] },
                                '$receiverId',
                                '$senderId'
                            ]
                        },
                        lastMessage: { $first: '$$ROOT' }
                    }
                },
                {
                    $limit: limit
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $project: {
                        userId: '$_id',
                        username: '$user.username',
                        avatar: '$user.currentAvatar',
                        lastMessage: '$lastMessage.content',
                        lastMessageTime: '$lastMessage.createdAt',
                        isLastMessageRead: '$lastMessage.isRead'
                    }
                },
                {
                    $sort: { lastMessageTime: -1 }
                }
            ]);
            return recentMessages;
        }
        catch (error) {
            console.error('Error getting recent conversations:', error);
            return [];
        }
    }
    // Clean old messages (run as a cron job)
    static async cleanOldMessages(daysOld = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);
            const result = await Message_1.default.updateMany({
                createdAt: { $lt: cutoffDate },
                isDeleted: false
            }, {
                $set: {
                    isDeleted: true,
                    deleteAt: new Date()
                }
            });
            console.log(`Marked ${result.modifiedCount} old messages for deletion`);
            return result.modifiedCount;
        }
        catch (error) {
            console.error('Error cleaning old messages:', error);
            return 0;
        }
    }
    // Delete all messages for a user (for account deletion)
    static async deleteAllUserMessages(userId) {
        try {
            const result = await Message_1.default.updateMany({
                $or: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            }, {
                $set: {
                    isDeleted: true,
                    deleteAt: new Date()
                }
            });
            console.log(`Marked ${result.modifiedCount} messages for deletion for user ${userId}`);
            return result.modifiedCount;
        }
        catch (error) {
            console.error('Error deleting user messages:', error);
            return 0;
        }
    }
    // Search messages
    static async searchMessages(userId, query, messageType = 'private', limit = 50) {
        try {
            let searchCriteria;
            if (messageType === 'private') {
                searchCriteria = {
                    content: { $regex: query, $options: 'i' },
                    isDeleted: false,
                    messageType: messageType,
                    $or: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                };
            }
            else {
                searchCriteria = {
                    content: { $regex: query, $options: 'i' },
                    isDeleted: false,
                    messageType: messageType
                };
            }
            const messages = await Message_1.default.find(searchCriteria)
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('senderId', 'username currentAvatar')
                .populate('receiverId', 'username currentAvatar');
            return messages;
        }
        catch (error) {
            console.error('Error searching messages:', error);
            return [];
        }
    }
    // Get message statistics for a user
    static async getUserMessageStats(userId) {
        try {
            const stats = await Message_1.default.aggregate([
                {
                    $match: {
                        $or: [
                            { senderId: new mongoose_1.default.Types.ObjectId(userId) },
                            { receiverId: new mongoose_1.default.Types.ObjectId(userId) }
                        ],
                        isDeleted: false
                    }
                },
                {
                    $group: {
                        _id: '$messageType',
                        count: { $sum: 1 },
                        sent: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$senderId', new mongoose_1.default.Types.ObjectId(userId)] },
                                    1,
                                    0
                                ]
                            }
                        },
                        received: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$receiverId', new mongoose_1.default.Types.ObjectId(userId)] },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                }
            ]);
            return stats;
        }
        catch (error) {
            console.error('Error getting user message stats:', error);
            return [];
        }
    }
}
module.exports = MessageUtils;
//# sourceMappingURL=MessageUtils.js.map