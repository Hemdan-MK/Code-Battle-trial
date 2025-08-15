"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    async create(userData) {
        const user = new User_1.default(userData);
        return await user.save();
    }
    async findById(id) {
        return await User_1.default.findById(id);
    }
    async findByEmail(email) {
        return await User_1.default.findOne({ email });
    }
    async findByUsername(username) {
        return await User_1.default.findOne({ username });
    }
    async findByGoogleId(googleId) {
        return await User_1.default.findOne({ googleId });
    }
    async findByGithubId(githubId) {
        return await User_1.default.findOne({ githubId });
    }
    async update(id, updates) {
        return await User_1.default.findByIdAndUpdate(id, updates, { new: true });
    }
    async delete(id) {
        const result = await User_1.default.findByIdAndDelete(id);
        return !!result;
    }
    async banUser(id) {
        const user = await User_1.default.findById(id);
        if (!user)
            return false;
        const result = await User_1.default.findByIdAndUpdate(id, { isBanned: !user.isBanned });
        return !!result;
    }
    async findByEmailWithPassword(email) {
        return await User_1.default.findOne({ email });
    }
    async getUsers({ page, limit, search, status }) {
        const query = {};
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        // Query by isBanned field
        if (status === 'banned') {
            query.isBanned = true;
        }
        const users = await User_1.default.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalCount = await User_1.default.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        return {
            users,
            totalCount,
            totalPages,
        };
    }
    async getUserStats() {
        const users = await User_1.default.find();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const stats = {
            total: users.length,
            online: 0,
            offline: 0,
            banned: 0,
            newSignups: 0,
            ranks: {
                diamond: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                iron: 0,
                unranked: 0
            }
        };
        users.forEach(user => {
            const status = user.status;
            const rank = user.rank;
            if (status === 'online')
                stats.online++;
            if (status === 'offline')
                stats.offline++;
            if (user.isBanned)
                stats.banned++;
            if (user.createdAt > sevenDaysAgo)
                stats.newSignups++;
            if (rank in stats.ranks)
                stats.ranks[rank]++;
        });
        return stats;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map