"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const authSchemas_1 = require("../../schemas/authSchemas");
class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
        this.details = async (req, res, next) => {
            try {
                const authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                const result = await this.profileService.details(token);
                return res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUsername = async (req, res, next) => {
            try {
                const authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                const validatedData = authSchemas_1.updateUsername.parse(req.body);
                const result = await this.profileService.updateUsername({ ...validatedData, token });
                return res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.updatePassword = async (req, res, next) => {
            try {
                const authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                const validatedData = authSchemas_1.updatePassword.parse(req.body);
                const result = await this.profileService.updatePassword({ ...validatedData, token });
                return res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.addPassword = async (req, res, next) => {
            try {
                const authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                // Assuming the new password is in the body, will add validation schema later
                const { newPassword } = req.body;
                if (!newPassword) {
                    return res.status(400).json({ message: 'New password is required' });
                }
                const result = await this.profileService.addPassword({ newPassword, token });
                return res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.getMatchHistory = async (req, res, next) => {
            try {
                const authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return res.status(401).json({ message: 'No token provided' });
                }
                const token = authHeader.split(' ')[1];
                const result = await this.profileService.getMatchHistory(token);
                return res.json({ success: true, data: result });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profileController.js.map