"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRepository = void 0;
const Reward_1 = __importDefault(require("../models/Reward"));
class RewardRepository {
    async create(data) {
        const reward = new Reward_1.default(data);
        return await reward.save();
    }
    async findById(id) {
        return await Reward_1.default.findById(id);
    }
    async findAll() {
        return await Reward_1.default.find();
    }
    async update(id, data) {
        return await Reward_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        await Reward_1.default.findByIdAndDelete(id);
    }
}
exports.RewardRepository = RewardRepository;
//# sourceMappingURL=RewardRepository.js.map