import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
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
    levelNumber: number;
    reward: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Level.d.ts.map