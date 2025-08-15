import mongoose, { Schema, Document } from 'mongoose';
export interface IMatch extends Document {
    gameMode: 'solo' | 'team3v3';
    teams: {
        players: {
            userId: Schema.Types.ObjectId;
            username: string;
        }[];
    }[];
    winner: number;
    score: string;
    eloChanges: {
        userId: Schema.Types.ObjectId;
        oldElo: number;
        newElo: number;
    }[];
    date: Date;
}
declare const MatchModel: mongoose.Model<IMatch, {}, {}, {}, mongoose.Document<unknown, {}, IMatch, {}> & IMatch & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default MatchModel;
//# sourceMappingURL=Match.d.ts.map