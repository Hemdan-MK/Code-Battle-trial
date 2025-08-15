"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const authHandler_1 = require("./handlers/auth/authHandler");
const friendsHandler_1 = require("./handlers/friends/friendsHandler");
const messagingHandler_1 = require("./handlers/messaging/messagingHandler");
const teamHandler_1 = require("./handlers/team/teamHandler");
const statusHandler_1 = require("./handlers/status/statusHandler");
const disconnectHandler_1 = require("./handlers/disconnect/disconnectHandler");
const userStore_1 = require("./store/userStore");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    // Setup authentication middleware
    (0, authHandler_1.setupAuth)(io);
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        socket.emit('auth_success', {
            userId: socket.userId,
            username: socket.user?.username,
        });
        // Setup all handlers
        (0, friendsHandler_1.setupFriendsHandlers)(socket, io, userStore_1.activeUsers);
        (0, messagingHandler_1.setupMessagingHandlers)(socket, io, userStore_1.activeUsers);
        (0, teamHandler_1.setupTeamHandlers)(socket, io, userStore_1.activeUsers);
        (0, statusHandler_1.setupStatusHandlers)(socket, io, userStore_1.activeUsers);
        // Handle disconnection
        socket.on('disconnect', (reason) => (0, disconnectHandler_1.handleDisconnect)(socket, io, userStore_1.activeUsers, reason));
        // Handle errors
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });
    return io;
};
exports.initSocket = initSocket;
//# sourceMappingURL=index.js.map