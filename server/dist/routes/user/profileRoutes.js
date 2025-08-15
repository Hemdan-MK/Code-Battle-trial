"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../../controllers/user/profileController");
const UserRepository_1 = require("../../repositories/UserRepository");
const profileService_1 = require("../../services/user/profileService");
const router = (0, express_1.Router)();
const userRepository = new UserRepository_1.UserRepository();
const profileService = new profileService_1.ProfileService(userRepository);
const profileController = new profileController_1.ProfileController(profileService);
router.get('/profile', profileController.details);
router.post('/updateusername', profileController.updateUsername);
router.post('/updatepassword', profileController.updatePassword);
router.post('/add-password', profileController.addPassword);
router.get('/match-history', profileController.getMatchHistory);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map