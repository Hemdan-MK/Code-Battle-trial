import { Server } from 'socket.io';
import { IUser } from '../../../models/interfaces/Index';
declare module "socket.io" {
    interface Socket {
        userId?: string;
        user?: IUser;
    }
}
export declare const setupAuth: (io: Server) => void;
//# sourceMappingURL=authHandler.d.ts.map