"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisconnect = void 0;
const User_1 = __importDefault(require("../../../models/User"));
const userStore_1 = require("../../store/userStore");
const handleDisconnect = async (socket, io, activeUsers, reason) => {
    console.log('User disconnected:', socket.id, 'Reason:', reason);
    // Find and remove user from active users
    let disconnectedUserId = null;
    let disconnectedUserInfo = null;
    for (const [userId, userInfo] of activeUsers.entries()) {
        if (userInfo.socketId === socket.id) {
            disconnectedUserId = userId;
            disconnectedUserInfo = userInfo;
            activeUsers.delete(userId);
            break;
        }
    }
    if (disconnectedUserId) {
        try {
            // Handle team cleanup
            const teamId = userStore_1.userTeams.get(disconnectedUserId);
            if (teamId) {
                const team = userStore_1.activeTeams.get(teamId);
                if (team) {
                    // Remove user from team
                    team.members = team.members.filter((member) => member.userId !== disconnectedUserId);
                    userStore_1.userTeams.delete(disconnectedUserId);
                    if (team.members.length === 0) {
                        // Delete empty team
                        userStore_1.activeTeams.delete(teamId);
                    }
                    else if (team.leader === disconnectedUserId && team.members.length > 0) {
                        // Transfer leadership to first remaining member
                        team.leader = team.members[0].userId;
                        io.to(teamId).emit('team_leader_changed', {
                            newLeader: team.members[0]
                        });
                    }
                    // Notify remaining team members
                    io.to(teamId).emit('team_member_left', {
                        userId: disconnectedUserId,
                        username: disconnectedUserInfo?.username || 'Unknown',
                        team
                    });
                }
            }
            // Only update to offline if it wasn't already handled by logout
            if (reason !== 'client namespace disconnect') {
                await User_1.default.findByIdAndUpdate(disconnectedUserId, {
                    status: 'offline',
                    lastSeen: new Date()
                });
                // Notify friends about offline status
                const user = await User_1.default.findById(disconnectedUserId).populate('friends', '_id');
                if (user && user.friends) {
                    const friendIds = user.friends.map((friend) => friend._id.toString());
                    friendIds.forEach((friendId) => {
                        const friendInfo = activeUsers.get(friendId);
                        if (friendInfo) {
                            io.to(friendInfo.socketId).emit('friend_status_update', {
                                userId: disconnectedUserId,
                                status: 'offline',
                                lastSeen: new Date(),
                                username: disconnectedUserInfo?.username || 'Unknown'
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error('Error updating offline status on disconnect:', error);
        }
    }
};
exports.handleDisconnect = handleDisconnect;
//# sourceMappingURL=disconnectHandler.js.map