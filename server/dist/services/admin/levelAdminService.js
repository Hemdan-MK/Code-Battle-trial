"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelAdminService = void 0;
class LevelAdminService {
    constructor(levelRepository) {
        this.levelRepository = levelRepository;
    }
    async createLevel(data) {
        return await this.levelRepository.create(data);
    }
    async getLevelById(id) {
        return await this.levelRepository.findById(id);
    }
    async getAllLevels() {
        return await this.levelRepository.findAll();
    }
    async updateLevel(id, data) {
        return await this.levelRepository.update(id, data);
    }
    async deleteLevel(id) {
        await this.levelRepository.delete(id);
    }
}
exports.LevelAdminService = LevelAdminService;
//# sourceMappingURL=levelAdminService.js.map