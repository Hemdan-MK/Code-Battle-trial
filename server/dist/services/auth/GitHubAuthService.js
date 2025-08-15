"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubAuthService = void 0;
const axios_1 = __importDefault(require("axios"));
class GitHubAuthService {
    async exchangeCode(code) {
        // Exchange code for access token
        const tokenResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const accessToken = tokenResponse.data.access_token;
        // Get user info
        const userResponse = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });
        return userResponse.data;
    }
}
exports.GitHubAuthService = GitHubAuthService;
//# sourceMappingURL=GitHubAuthService.js.map