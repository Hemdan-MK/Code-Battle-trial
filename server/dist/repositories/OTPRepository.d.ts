import { IOTP } from "../models/interfaces/Index";
import { IOTPRepository } from "./interfaces";
export declare class OTPRepository implements IOTPRepository {
    create(otpData: Partial<IOTP>): Promise<IOTP>;
    findByUserIdAndType(userId: string): Promise<IOTP | null>;
    deleteByUserIdAndType(userId: string): Promise<boolean>;
    deleteExpired(): Promise<number>;
}
//# sourceMappingURL=OTPRepository.d.ts.map