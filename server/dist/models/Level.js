"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const levelRewardSchema = new mongoose_1.default.Schema({
    levelNumber: {
        type: Number,
        required: true,
        unique: true // one record per level
    },
    reward: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reward', // link to avatar/title reward
        required: true
    },
    description: {
        type: String,
        default: '' // e.g., "Unlocks Cyber Ninja avatar at level 50"
    },
    issuedTo: [
        {
            userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
            issuedAt: { type: Date, default: Date.now },
            claimedAt: { type: Date },
            isClaimed: { type: Boolean, default: false }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Level', levelRewardSchema);
//# sourceMappingURL=Level.js.map