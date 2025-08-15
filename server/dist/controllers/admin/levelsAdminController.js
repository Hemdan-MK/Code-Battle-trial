"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelsAdminController = void 0;
class LevelsAdminController {
    constructor(levelAdminService) {
        this.levelAdminService = levelAdminService;
    }
    async createLevel(req, res) {
        try {
            const level = await this.levelAdminService.createLevel(req.body);
            res.status(201).json(level);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating level', error });
        }
    }
    async getLevelById(req, res) {
        try {
            const level = await this.levelAdminService.getLevelById(req.params.id);
            if (level) {
                res.status(200).json(level);
            }
            else {
                res.status(404).json({ message: 'Level not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error getting level', error });
        }
    }
    async getAllLevels(req, res) {
        try {
            const levels = await this.levelAdminService.getAllLevels();
            res.status(200).json(levels);
        }
        catch (error) {
            res.status(500).json({ message: 'Error getting levels', error });
        }
    }
    async updateLevel(req, res) {
        try {
            const level = await this.levelAdminService.updateLevel(req.params.id, req.body);
            if (level) {
                res.status(200).json(level);
            }
            else {
                res.status(404).json({ message: 'Level not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating level', error });
        }
    }
    async deleteLevel(req, res) {
        try {
            await this.levelAdminService.deleteLevel(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting level', error });
        }
    }
}
exports.LevelsAdminController = LevelsAdminController;
//# sourceMappingURL=levelsAdminController.js.map