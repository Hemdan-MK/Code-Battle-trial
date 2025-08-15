import { UserRepository } from '../../repositories/UserRepository';
import { CreateUser, UpdateUser, GetUsers } from '../../types/index';
export declare class UserAdminService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUsers(query: GetUsers): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("../../models/interfaces/Index").IUser, {}> & import("../../models/interfaces/Index").IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
        totalCount: number;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<import("../../models/interfaces/Index").IUser | null>;
    createUser(userData: CreateUser): Promise<Error | import("../../models/interfaces/Index").IUser>;
    updateUser(id: string, updateData: UpdateUser): Promise<import("../../models/interfaces/Index").IUser | null>;
    banUser(id: string): Promise<boolean>;
    getUserStats(): Promise<import("../../types/index").UserStats>;
}
//# sourceMappingURL=userAdminService.d.ts.map