"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemAdminService = void 0;
class ProblemAdminService {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }
    async createProblem(data) {
        return await this.problemRepository.create(data);
    }
    async getProblemById(id) {
        return await this.problemRepository.findById(id);
    }
    async getAllProblems() {
        return await this.problemRepository.findAll();
    }
    async updateProblem(id, data) {
        return await this.problemRepository.update(id, data);
    }
    async deleteProblem(id) {
        await this.problemRepository.delete(id);
    }
}
exports.ProblemAdminService = ProblemAdminService;
//# sourceMappingURL=problemAdminService.js.map