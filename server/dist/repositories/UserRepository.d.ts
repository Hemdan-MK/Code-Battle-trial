import { IUser } from "../models/interfaces/Index";
import { GetUsers, UserStats } from "../types";
import { IUserRepository } from "./interfaces";
export declare class UserRepository implements IUserRepository {
    create(userData: Partial<IUser>): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findByUsername(username: string): Promise<IUser | null>;
    findByGoogleId(googleId: string): Promise<IUser | null>;
    findByGithubId(githubId: string): Promise<IUser | null>;
    update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<boolean>;
    banUser(id: string): Promise<boolean>;
    findByEmailWithPassword(email: string): Promise<IUser | null>;
    getUsers({ page, limit, search, status }: GetUsers): Promise<{
        users: (import("mongoose").Document<unknown, {}, IUser, {}> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
        totalCount: number;
        totalPages: number;
    }>;
    getUserStats(): Promise<UserStats>;
}
//# sourceMappingURL=UserRepository.d.ts.map