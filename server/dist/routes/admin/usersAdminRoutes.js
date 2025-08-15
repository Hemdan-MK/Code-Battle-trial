"use strict";
// routes/admin/user.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersAdminController_1 = require("../../controllers/admin/usersAdminController");
const userAdminService_1 = require("../../services/admin/userAdminService");
const UserRepository_1 = require("../../repositories/UserRepository");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
const userRepository = new UserRepository_1.UserRepository();
const userService = new userAdminService_1.UserAdminService(userRepository);
const usersController = new usersAdminController_1.UsersAdminController(userService);
router.get("/users", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.getUsers.bind(usersController));
router.get("/user/:id", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.getUserById.bind(usersController));
router.post("/create", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.createUser.bind(usersController));
router.get("/edit/:id", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.editRequest.bind(usersController));
router.put("/update/:id", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.updateUser.bind(usersController));
router.patch("/user-ban/:id", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.banStatus.bind(usersController));
router.get("/users/stats", auth_1.authenticateToken, (0, auth_1.checkRole)('admin'), usersController.getUserStats.bind(usersController));
exports.default = router;
//# sourceMappingURL=usersAdminRoutes.js.map