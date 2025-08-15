"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Match_1 = __importDefault(require("../../models/Match"));
class ProfileService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async details(token) {
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            username: user.username,
            tag: user.tag,
            email: user.email,
            phone: user.phone,
            rank: user.rank,
            level: user.level,
            xp: user.xp,
            hasPassword: !!user.password, // Check if password field exists and is not empty
            currentAvatar: user.currentAvatar,
            currentTitle: user.currentTitle,
            collections: user.collections,
            gamePlayed: user.gamePlayed,
            friends: user.friends,
            pendingFriendRequests: user.pendingFriendRequests
        };
    }
    async updateUsername(data) {
        const { username, tag, token } = data;
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.update(user._id, { username: username, tag: tag });
        return {
            success: true,
            message: "username updation success"
        };
    }
    async updatePassword(data) {
        const { currentPassword, newPassword, token } = data;
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return {
                success: false,
                message: 'Check your Current password ...pls'
            };
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        const updatedUser = await this.userRepository.update(user._id, {
            password: hashedPassword
        });
        if (!updatedUser) {
            throw new Error('Failed to update password');
        }
        return {
            success: true,
            message: "password updation success"
        };
    }
    async addPassword(data) {
        const { newPassword, token } = data;
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password) {
            throw new Error('User already has a password. Use the change password functionality.');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        await this.userRepository.update(user._id, {
            password: hashedPassword
        });
        return {
            success: true,
            message: "Password added successfully"
        };
    }
    async getMatchHistory(token) {
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = new mongoose_1.Types.ObjectId(decoded.userId);
        const matches = await Match_1.default.find({ "teams.players.userId": userId })
            .sort({ date: -1 })
            .limit(20); // Limit to the last 20 matches for performance
        return matches;
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profileService.js.map