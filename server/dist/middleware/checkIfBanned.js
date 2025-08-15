"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfBanned = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const JWT_SECRET = process.env.JWT_SECRET;
const checkIfBanned = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decoded.id);
        const userRepository = new UserRepository_1.UserRepository();
        const user = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.isBanned) {
            return res.status(403).json({ success: false, message: 'User is banned' });
        }
        else {
            next();
        }
    }
    catch (err) {
        console.error('Middleware error:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
exports.checkIfBanned = checkIfBanned;
//# sourceMappingURL=checkIfBanned.js.map