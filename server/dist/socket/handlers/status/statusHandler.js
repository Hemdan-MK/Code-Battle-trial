"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStatusHandlers = void 0;
const User_1 = __importDefault(require("../../../models/User"));
const setupStatusHandlers = (socket, io, activeUsers) => {
    // Handle status updates
    socket.on('update_status', async (data) => {
        try {
            const { userId, status, currentGame } = data;
            // Validate that userId matches the authenticated user
            if (userId !== socket.userId) {
                return;
            }
            const userInfo = activeUsers.get(userId);
            if (userInfo) {
                userInfo.status = status;
                if (currentGame && currentGame !== 'Online') {
                    userInfo.currentGame = currentGame;
                }
                // Update in database
                await User_1.default.findByIdAndUpdate(userId, {
                    status,
                    currentGame,
                    lastSeen: new Date()
                });
                // Broadcast status update to friends
                const user = await User_1.default.findById(userId).populate('friends', '_id');
                if (user && user.friends) {
                    const friendIds = user.friends.map((friend) => friend._id.toString());
                    friendIds.forEach((friendId) => {
                        const friendInfo = activeUsers.get(friendId);
                        if (friendInfo) {
                            io.to(friendInfo.socketId).emit('friend_status_update', {
                                userId,
                                status,
                                game: currentGame,
                                username: userInfo.username
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error('Error updating status:', error);
        }
    });
    // Handle authentication errors
    socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
        socket.emit('auth_error', { message: error.message });
    });
    // Handle user logout
    socket.on('user_logout', async (data) => {
        try {
            const { userId } = data;
            if (userId !== socket.userId) {
                return;
            }
            console.log(`User ${userId} is logging out`);
            // Update user status to offline in database
            await User_1.default.findByIdAndUpdate(userId, {
                status: 'offline',
                lastSeen: new Date()
            });
            // Get user's friends to notify them
            const user = await User_1.default.findById(userId).populate('friends', '_id');
            if (user && user.friends) {
                const friendIds = user.friends.map((friend) => friend._id.toString());
                // Notify all friends that this user went offline
                friendIds.forEach((friendId) => {
                    const friendInfo = activeUsers.get(friendId);
                    if (friendInfo) {
                        io.to(friendInfo.socketId).emit('friend_status_update', {
                            userId,
                            status: 'offline',
                            lastSeen: new Date(),
                            username: activeUsers.get(userId)?.username || 'Unknown'
                        });
                    }
                });
            }
            // Remove user from active users map
            activeUsers.delete(userId);
            // Confirm logout to client
            socket.emit('logout_confirmed', {
                message: 'Successfully logged out'
            });
            // Disconnect the socket
            socket.disconnect(true);
        }
        catch (error) {
            console.error('Error handling user logout:', error);
            socket.emit('logout_error', {
                message: 'Failed to process logout properly'
            });
        }
    });
};
exports.setupStatusHandlers = setupStatusHandlers;
//# sourceMappingURL=statusHandler.js.map