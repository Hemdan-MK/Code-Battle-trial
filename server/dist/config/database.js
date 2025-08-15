"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        await mongoose_1.default.connect(mongoUri);
        console.log(' Connected to MongoDB successfully');
        console.log(' Database:', mongoose_1.default.connection.name);
    }
    catch (error) {
        console.error(' MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map