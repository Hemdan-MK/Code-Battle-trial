"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    token: { type: String, required: false },
    username: { type: String, required: true },
    tag: { type: String, default: "codeBattle" },
    refreshToken: { type: String, },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, },
    password: { type: String, required: false }, // Changed to not required
    role: { type: String, default: "user" },
    googleId: { type: String, default: null },
    githubId: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false, },
    isPhoneVerified: { type: Boolean, default: false, },
    status: {
        type: String,
        default: 'offline'
    },
    rank: { type: String, default: 'unranked' },
    level: { type: Number, default: 1 },
    xp: {
        type: Number,
        default: 10
    },
    elo: {
        type: Number,
        default: 1200
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    currentAvatar: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Avatar', default: null },
    currentTitle: { type: String, default: "Noobie" },
    collections: {
        Avatar: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Avatar' }],
        Title: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Title' }]
    },
    gamePlayed: { type: Number, default: 0 },
    friends: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    pendingFriendRequests: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map