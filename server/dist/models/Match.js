"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    gameMode: { type: String, required: true, enum: ['solo', 'team3v3'] },
    teams: [
        {
            players: [
                {
                    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
                    username: { type: String, required: true }
                }
            ]
        }
    ],
    winner: { type: Number, required: true }, // 0 or 1
    score: { type: String, required: true },
    eloChanges: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            oldElo: { type: Number, required: true },
            newElo: { type: Number, required: true }
        }
    ],
    date: { type: Date, default: Date.now }
});
const MatchModel = (0, mongoose_1.model)('Match', matchSchema);
exports.default = MatchModel;
//# sourceMappingURL=Match.js.map