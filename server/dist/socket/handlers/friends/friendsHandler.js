"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFriendsHandlers = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../../models/User"));
const isValidObjectId = (id) => {
    return mongoose_1.Types.ObjectId.isValid(id) && (String(new mongoose_1.Types.ObjectId(id)) === id);
};
async function getFriends(userId, activeUsers, query) {
    const user = await User_1.default.findById(userId)
        .populate({
        path: 'friends',
        match: query ? { username: { $regex: query, $options: 'i' } } : {},
        select: '_id username currentAvatar status currentGame rank lastSeen updatedAt'
    })
        .exec();
    if (!user) {
        throw new Error('User not found');
    }
    const friendsWithStatus = user.friends.map((friend) => {
        const friendId = friend._id.toString();
        const isOnline = activeUsers.has(friendId);
        return {
            id: friendId,
            username: friend.username,
            avatar: friend.currentAvatar,
            status: isOnline ? 'online' : friend.status || 'offline',
            game: friend.currentGame || (isOnline ? 'Online' : 'Offline'),
            rank: friend.rank || 'UNRANKED',
            lastSeen: friend.lastSeen || friend.updatedAt
        };
    });
    return friendsWithStatus;
}
const setupFriendsHandlers = (socket, io, activeUsers) => {
    socket.on('get_Details', async () => {
        try {
            const userId = socket.userId;
            if (!userId || !isValidObjectId(userId)) {
                socket.emit('error', {
                    message: 'Invalid user ID format or userId.'
                });
                return;
            }
            const user = await User_1.default.findById(userId).exec();
            if (!user) {
                socket.emit('connect_error', {
                    message: 'User not found. Please log in again.'
                });
                return;
            }
            socket.emit('detail_resp', { user });
        }
        catch (error) {
            console.error('Error fetching details:', error);
            socket.emit('error', {
                message: 'Failed to load details. Please try again.'
            });
        }
    });
    socket.on('client_ready', async () => {
        try {
            const userId = socket.userId;
            if (!userId || !isValidObjectId(userId)) {
                console.error("client_ready: Invalid user ID for socket", socket.id);
                return;
            }
            // Avoid re-running setup for the same user if they are already active
            if (activeUsers.has(userId) && activeUsers.get(userId)?.socketId === socket.id) {
                // If the same socket is trying to initialize again, maybe just refresh friends
                const friendsWithStatus = await getFriends(userId, activeUsers);
                socket.emit('friends_list', { friends: friendsWithStatus });
                return;
            }
            const user = await User_1.default.findById(userId).populate('friends', '_id').exec();
            if (!user) {
                socket.emit('friends_error', { message: 'User not found during client_ready.' });
                return;
            }
            // Store user connection
            activeUsers.set(userId, {
                socketId: socket.id,
                username: user.username,
                tag: user.tag,
                currentAvatar: user.currentAvatar,
                status: 'online',
                currentGame: user.currentGame,
                lastSeen: new Date()
            });
            // Join user to their personal room
            socket.join(`user_${userId}`);
            // Update user status in database
            await User_1.default.findByIdAndUpdate(userId, {
                status: 'online',
                lastSeen: new Date()
            });
            // Broadcast user status to friends
            const friendIds = user.friends.map((friend) => friend._id.toString());
            friendIds.forEach((friendId) => {
                const friendInfo = activeUsers.get(friendId);
                if (friendInfo) {
                    io.to(friendInfo.socketId).emit('friend_status_update', {
                        userId,
                        status: 'online',
                        username: user.username,
                        game: user.currentGame || 'Online'
                    });
                }
            });
            // Get friends with updated online status
            const friendsWithStatus = await getFriends(userId, activeUsers);
            socket.emit('friends_list', { friends: friendsWithStatus });
            // Send pending friend requests
            const pendingRequests = await User_1.default.findById(userId)
                .populate('pendingFriendRequests', '_id username currentAvatar')
                .exec();
            if (pendingRequests && pendingRequests.pendingFriendRequests) {
                const formattedRequests = pendingRequests.pendingFriendRequests.map((request) => ({
                    senderId: request._id.toString(),
                    senderName: request.username,
                    senderAvatar: request.currentAvatar
                }));
                socket.emit('pending_friend_requests', { requests: formattedRequests });
            }
            console.log(`User ${user.username} (${userId}) connected and friends loaded`);
        }
        catch (error) {
            console.error('Error in client_ready handler:', error);
            socket.emit('friends_error', { message: 'Failed to initialize client state.' });
        }
    });
    socket.on('get_friends', async () => {
        try {
            const userId = socket.userId;
            if (!userId || !isValidObjectId(userId)) {
                socket.emit('friends_error', { message: 'Invalid user ID format.' });
                return;
            }
            const friendsWithStatus = await getFriends(userId, activeUsers);
            socket.emit('friends_list', { friends: friendsWithStatus });
        }
        catch (error) {
            console.error('Error fetching friends:', error);
            socket.emit('friends_error', { message: 'Failed to load friends.' });
        }
    });
    socket.on('send_friend_request', async (data) => {
        try {
            const { senderId, receiverUsername, receiverTag } = data;
            if (senderId !== socket.userId) {
                socket.emit('friend_request_error', { message: 'Unauthorized request' });
                return;
            }
            const senderInfo = activeUsers.get(senderId);
            if (!senderInfo) {
                socket.emit('friend_request_error', { message: 'Sender not found' });
                return;
            }
            const receiver = await User_1.default.findOne({
                username: receiverUsername,
                tag: receiverTag
            });
            if (!receiver) {
                socket.emit('friend_request_error', { message: 'User not found' });
                return;
            }
            if (receiver._id.toString() === senderId) {
                socket.emit('friend_request_error', { message: 'Cannot add yourself as a friend' });
                return;
            }
            const sender = await User_1.default.findById(senderId);
            if (!sender) {
                socket.emit('friend_request_error', { message: 'Sender not found' });
                return;
            }
            const receiverObjectId = new mongoose_1.Types.ObjectId(receiver._id);
            const alreadyFriends = sender.friends?.some((friendId) => friendId.equals(receiverObjectId));
            if (alreadyFriends) {
                socket.emit('friend_request_error', { message: 'Already friends' });
                return;
            }
            const requestAlreadySent = receiver.pendingFriendRequests?.some((requestId) => requestId.toString() === senderId);
            if (requestAlreadySent) {
                socket.emit('friend_request_error', { message: 'Friend request already sent' });
                return;
            }
            await User_1.default.findByIdAndUpdate(receiver._id, {
                $addToSet: { pendingFriendRequests: senderId }
            });
            const receiverInfo = activeUsers.get(receiver._id.toString());
            if (receiverInfo) {
                io.to(receiverInfo.socketId).emit('friend_request_received', {
                    senderId,
                    senderName: senderInfo.username,
                    senderAvatar: senderInfo.currentAvatar,
                    message: `${senderInfo.username} wants to be your friend`
                });
            }
            socket.emit('friend_request_sent', {
                message: `Friend request sent to ${receiverUsername}#${receiverTag}`
            });
        }
        catch (error) {
            console.error('Error sending friend request:', error);
            socket.emit('friend_request_error', { message: 'Failed to send friend request' });
        }
    });
    socket.on('accept_friend_request', async (data) => {
        try {
            const { userId, requesterId } = data;
            if (userId !== socket.userId) {
                socket.emit('friend_request_error', { message: 'Unauthorized request' });
                return;
            }
            await User_1.default.findByIdAndUpdate(userId, {
                $addToSet: { friends: requesterId },
                $pull: { pendingFriendRequests: requesterId }
            });
            await User_1.default.findByIdAndUpdate(requesterId, {
                $addToSet: { friends: userId }
            });
            const userInfo = activeUsers.get(userId);
            const requesterInfo = activeUsers.get(requesterId);
            if (requesterInfo) {
                io.to(requesterInfo.socketId).emit('friend_request_accepted', {
                    userId,
                    username: userInfo?.username || 'Unknown'
                });
            }
            socket.emit('friend_added', {
                friendId: requesterId,
                friendName: requesterInfo?.username || 'Unknown'
            });
        }
        catch (error) {
            console.error('Error accepting friend request:', error);
            socket.emit('friend_request_error', { message: 'Failed to accept friend request' });
        }
    });
    socket.on('reject_friend_request', async (data) => {
        try {
            const { userId, requesterId } = data;
            if (userId !== socket.userId) {
                socket.emit('friend_request_error', { message: 'Unauthorized request' });
                return;
            }
            await User_1.default.findByIdAndUpdate(userId, {
                $pull: { pendingFriendRequests: requesterId }
            });
            const requesterInfo = activeUsers.get(requesterId);
            if (requesterInfo) {
                io.to(requesterInfo.socketId).emit('friend_request_rejected', {
                    userId,
                    username: activeUsers.get(userId)?.username || 'Unknown'
                });
            }
            socket.emit('friend_request_rejected', {
                requesterId,
                requesterName: requesterInfo?.username || 'Unknown'
            });
        }
        catch (error) {
            console.error('Error rejecting friend request:', error);
            socket.emit('friend_request_error', { message: 'Failed to reject friend request' });
        }
    });
    socket.on('remove_friend', async (data) => {
        try {
            const { userId, friendId } = data;
            if (userId !== socket.userId) {
                socket.emit('friend_request_error', { message: 'Unauthorized request' });
                return;
            }
            const toObjectId = (id) => new mongoose_2.default.Types.ObjectId(id);
            await User_1.default.findByIdAndUpdate(userId, {
                $pull: { friends: toObjectId(friendId) }
            });
            await User_1.default.findByIdAndUpdate(friendId, {
                $pull: { friends: toObjectId(userId) }
            });
            const userInfo = activeUsers.get(userId);
            const friendInfo = activeUsers.get(friendId);
            if (friendInfo) {
                io.to(friendInfo.socketId).emit('friend_removed', {
                    userId,
                    username: userInfo?.username || 'Unknown'
                });
            }
            socket.emit('friend_removed', {
                friendId,
                friendName: friendInfo?.username || 'Unknown'
            });
        }
        catch (error) {
            console.error('Error removing friend:', error);
            socket.emit('friend_request_error', { message: 'Failed to remove friend' });
        }
    });
    socket.on('get_friends_list', async (data) => {
        try {
            const { userId } = data;
            if (userId !== socket.userId) {
                socket.emit('team_error', { message: 'Unauthorized request' });
                return;
            }
            const friendsWithStatus = await getFriends(userId, activeUsers);
            socket.emit('friends_list', { friends: friendsWithStatus });
        }
        catch (error) {
            console.error('Error fetching friends list:', error);
            socket.emit('friends_error', { message: 'Failed to fetch friends list' });
        }
    });
    socket.on('search_friends', async (data) => {
        try {
            const { userId, query } = data;
            if (userId !== socket.userId) {
                socket.emit('friends_error', { message: 'Unauthorized request' });
                return;
            }
            const friendsWithStatus = await getFriends(userId, activeUsers, query);
            socket.emit('friends_list', { friends: friendsWithStatus });
        }
        catch (error) {
            console.error('Error searching friends:', error);
            socket.emit('friends_error', { message: 'Failed to search friends' });
        }
    });
};
exports.setupFriendsHandlers = setupFriendsHandlers;
//# sourceMappingURL=friendsHandler.js.map