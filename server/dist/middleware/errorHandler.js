"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    // Zod validation errors
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
        return;
    }
    // JWT errors
    if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
        return;
    }
    if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
        res.status(401).json({
            success: false,
            message: 'Token expired'
        });
        return;
    }
    // MongoDB duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
        return;
    }
    // Custom application errors
    if (error.message) {
        res.status(400).json({
            success: false,
            message: error.message
        });
        return;
    }
    // Default server error
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map