"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access token required'
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Verify token type
        if (decoded.type !== 'access') {
            res.status(401).json({
                success: false,
                message: 'Invalid token type'
            });
            return;
        }
        // Verify user exists
        const userRepository = new UserRepository_1.UserRepository();
        const user = await userRepository.findById(decoded.userId.toString());
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
        req.user = { userId: decoded.userId.toString(), role: user.role };
        next();
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
exports.authenticateToken = authenticateToken;
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient role'
            });
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=auth.js.map