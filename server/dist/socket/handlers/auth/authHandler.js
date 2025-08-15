"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../../models/User"));
const setupAuth = (io) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            console.log("Authentication token received:", token);
            if (!token) {
                return next(new Error('No token provided'));
            }
            // Verify JWT token with proper typing
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            console.log("Token decoded:", decoded);
            // Validate user exists in database
            const user = await User_1.default.findById(decoded.userId).select('_id username currentAvatar tag');
            if (!user) {
                return next(new Error('User not found'));
            }
            // Attach user info to socket
            socket.userId = user._id.toString();
            socket.user = user;
            next();
        }
        catch (error) {
            console.error('Socket authentication error:', error);
            if (error.name === 'JsonWebTokenError') {
                next(new Error('Invalid token'));
            }
            else if (error.name === 'TokenExpiredError') {
                next(new Error('Token expired'));
            }
            else {
                next(new Error('Authentication failed'));
            }
        }
    });
};
exports.setupAuth = setupAuth;
//# sourceMappingURL=authHandler.js.map