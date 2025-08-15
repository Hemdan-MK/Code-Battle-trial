import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
}, {}> & {
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    title: string;
    status: "draft" | "published" | "archived";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    problemId: number;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
    testCases: mongoose.Types.DocumentArray<{
        input: string;
        output: string;
        isPublic: boolean;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        input: string;
        output: string;
        isPublic: boolean;
    }> & {
        input: string;
        output: string;
        isPublic: boolean;
    }>;
    constraints?: string | null | undefined;
    functionSignature?: string | null | undefined;
    codeTemplates?: Map<string, string> | null | undefined;
    officialSolution?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Problem.d.ts.map