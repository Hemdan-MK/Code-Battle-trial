import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
}, {}> & {
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    status: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    name: string;
    rewardId: number;
    rewardType: "avatar" | "title";
    unlockType: "level_based" | "rank_based";
    issuedTo: mongoose.Types.DocumentArray<{
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }> & {
        issuedAt: NativeDate;
        isClaimed: boolean;
        userId?: mongoose.Types.ObjectId | null | undefined;
        claimedAt?: NativeDate | null | undefined;
    }>;
    avatar?: string | null | undefined;
    title?: string | null | undefined;
    rewardImage?: string | null | undefined;
    requiredLevel?: number | null | undefined;
    requiredRank?: number | null | undefined;
    startDate?: NativeDate | null | undefined;
    endDate?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Reward.d.ts.map