"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const Match_1 = __importDefault(require("../models/Match"));
const User_1 = __importDefault(require("../models/User"));
class MatchService {
    constructor() { }
    /**
     * Records a completed match and updates player ELOs.
     * This is a placeholder and would need to be integrated with the game server logic.
     * @param matchData The data of the completed match.
     */
    async recordMatch(matchData) {
        try {
            // In a real implementation, you would calculate ELO changes here
            // and update each player's ELO in the User model.
            // For now, just save the match data.
            const newMatch = new Match_1.default(matchData);
            await newMatch.save();
            // Placeholder for updating user ELOs
            if (matchData.eloChanges) {
                for (const eloChange of matchData.eloChanges) {
                    await User_1.default.findByIdAndUpdate(eloChange.userId, {
                        $set: { elo: eloChange.newElo },
                        $inc: { gamePlayed: 1 }
                    });
                }
            }
            return newMatch;
        }
        catch (error) {
            console.error("Error recording match:", error);
            throw new Error("Failed to record match.");
        }
    }
}
exports.MatchService = MatchService;
//# sourceMappingURL=matchService.js.map