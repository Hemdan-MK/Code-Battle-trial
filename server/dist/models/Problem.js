"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testCaseSchema = new mongoose_1.default.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false // true = visible in problem statement, false = hidden
    }
});
const problemSchema = new mongoose_1.default.Schema({
    problemId: {
        type: Number,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    categories: {
        type: [String], // e.g. ['Array', 'Hash Table']
        default: []
    },
    description: {
        type: String,
        required: true
    },
    constraints: {
        type: String
    },
    testCases: {
        type: [testCaseSchema],
        default: []
    },
    functionSignature: {
        type: String, // e.g. "def twoSum(nums: List[int], target: int) -> List[int]:"
    },
    codeTemplates: {
        type: Map, // key = language, value = starter code
        of: String
    },
    officialSolution: {
        type: String // could be code or a link to editorial
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
});
exports.default = mongoose_1.default.model('Problem', problemSchema);
//# sourceMappingURL=Problem.js.map