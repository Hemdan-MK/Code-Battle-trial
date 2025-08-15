"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const messageSchema = new mongoose_1.Schema({
    // Message content
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    // Sender information
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderAvatar: {
        type: String,
        default: '/image/default-avatar.webp'
    },
    // Message type: 'private' or 'team'
    messageType: {
        type: String,
        enum: ['private', 'team'],
        required: true
    },
    // For private messages
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: function (value) {
                return this.messageType !== 'private' || (this.messageType === 'private' && value != null);
            },
            message: 'receiverId is required for private messages'
        }
    },
    // For team messages
    teamId: {
        type: String,
        validate: {
            validator: function (value) {
                return this.messageType !== 'team' || (this.messageType === 'team' && value != null && value.trim().length > 0);
            },
            message: 'teamId is required for team messages'
        }
    },
    // Message status
    isRead: {
        type: Boolean,
        default: false
    },
    // Soft delete flag
    isDeleted: {
        type: Boolean,
        default: false
    },
    // Auto-delete timestamp (for team messages when user leaves/logs out)
    deleteAt: {
        type: Date,
        index: { expireAfterSeconds: 0 }
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});
// Index for efficient querying
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 }); // Private messages
messageSchema.index({ teamId: 1, createdAt: -1 }); // Team messages
messageSchema.index({ messageType: 1, createdAt: -1 });
messageSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
// Static method to get private chat history
messageSchema.statics.getPrivateChat = function (userId1, userId2, limit = 50) {
    return this.find({
        messageType: 'private',
        isDeleted: false,
        $or: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
        ]
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('senderId', 'username currentAvatar')
        .populate('receiverId', 'username currentAvatar');
};
// Static method to get team chat history
messageSchema.statics.getTeamChat = function (teamId, limit = 50) {
    return this.find({
        messageType: 'team',
        teamId: teamId,
        isDeleted: false
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('senderId', 'username currentAvatar');
};
// Static method to delete team messages when user leaves
messageSchema.statics.deleteTeamMessagesForUser = function (teamId, userId) {
    // Set deleteAt to current time for immediate deletion
    return this.updateMany({
        messageType: 'team',
        teamId: teamId,
        senderId: userId
    }, {
        $set: {
            deleteAt: new Date(),
            isDeleted: true
        }
    });
};
// Static method to delete all team messages when team is disbanded
messageSchema.statics.deleteAllTeamMessages = function (teamId) {
    return this.updateMany({
        messageType: 'team',
        teamId: teamId
    }, {
        $set: {
            deleteAt: new Date(),
            isDeleted: true
        }
    });
};
// Static method to delete private chat when user logs out (optional)
messageSchema.statics.deletePrivateMessagesForUser = function (userId) {
    return this.updateMany({
        messageType: 'private',
        $or: [{ senderId: userId }, { receiverId: userId }]
    }, {
        $set: {
            deleteAt: new Date(),
            isDeleted: true
        }
    });
};
// Instance method to mark message as read
messageSchema.methods.markAsRead = function () {
    this.isRead = true;
    return this.save();
};
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
//# sourceMappingURL=Message.js.map