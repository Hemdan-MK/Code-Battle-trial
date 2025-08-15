"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelRepository = void 0;
const Level_1 = __importDefault(require("../models/Level"));
class LevelRepository {
    async create(data) {
        const level = new Level_1.default(data);
        return await level.save();
    }
    async findById(id) {
        return await Level_1.default.findById(id);
    }
    async findByLevel(level) {
        return await Level_1.default.findOne({ levelNumber: level });
    }
    async findAll() {
        return await Level_1.default.find();
    }
    async update(id, data) {
        return await Level_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        await Level_1.default.findByIdAndDelete(id);
    }
}
exports.LevelRepository = LevelRepository;
//# sourceMappingURL=LevelRepository.js.map