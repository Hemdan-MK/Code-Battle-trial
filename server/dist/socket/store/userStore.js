"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTeams = exports.activeTeams = exports.userRooms = exports.activeUsers = void 0;
// Store active users and their socket connections
exports.activeUsers = new Map();
exports.userRooms = new Map();
// Team-related stores
exports.activeTeams = new Map(); // teamId -> { members: [], leader: userId, mode: string }
exports.userTeams = new Map(); // userId -> teamId
//# sourceMappingURL=userStore.js.map