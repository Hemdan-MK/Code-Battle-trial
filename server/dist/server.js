"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./config/database"));
const rateLimitter_1 = __importDefault(require("./middleware/rateLimitter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const socket_1 = require("./socket");
// Routes
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const admin_1 = __importDefault(require("./routes/admin"));
const profileRoutes_1 = __importDefault(require("./routes/user/profileRoutes"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
exports.io = (0, socket_1.initSocket)(server);
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
// app.use(morgan('combined'));
app.use(rateLimitter_1.default);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use(testRoute_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/admin', admin_1.default);
app.use('/user', profileRoutes_1.default);
// Error handling
app.use(errorHandler_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
const startServer = async () => {
    try {
        await (0, database_1.default)();
        server.listen(PORT, () => {
            console.log(`Server running on port -> ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map