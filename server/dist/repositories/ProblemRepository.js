"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemRepository = void 0;
const Problem_1 = __importDefault(require("../models/Problem"));
class ProblemRepository {
    async create(data) {
        const problem = new Problem_1.default(data);
        return await problem.save();
    }
    async findById(id) {
        return await Problem_1.default.findById(id);
    }
    async findAll() {
        return await Problem_1.default.find();
    }
    async update(id, data) {
        return await Problem_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        await Problem_1.default.findByIdAndDelete(id);
    }
}
exports.ProblemRepository = ProblemRepository;
//# sourceMappingURL=ProblemRepository.js.map