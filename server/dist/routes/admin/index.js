"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersAdminRoutes_1 = __importDefault(require("./usersAdminRoutes"));
const problemsAdminRoutes_1 = __importDefault(require("./problemsAdminRoutes"));
const rewardsAdminRoutes_1 = __importDefault(require("./rewardsAdminRoutes"));
const levelsAdminRoutes_1 = __importDefault(require("./levelsAdminRoutes"));
const dashboardAdminRoutes_1 = __importDefault(require("./dashboardAdminRoutes"));
const router = (0, express_1.Router)();
router.use(usersAdminRoutes_1.default);
router.use(problemsAdminRoutes_1.default);
router.use(rewardsAdminRoutes_1.default);
router.use(levelsAdminRoutes_1.default);
router.use(dashboardAdminRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map