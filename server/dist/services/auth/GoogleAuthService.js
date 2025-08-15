"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const google_auth_library_1 = require("google-auth-library");
class GoogleAuthService {
    constructor() {
        this.client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async verifyToken(token) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Invalid Google token');
        }
        return payload;
    }
}
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.js.map