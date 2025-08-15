import { Socket, Server } from 'socket.io';
import { IActiveUser } from '../../store/userStore';
export declare const handleDisconnect: (socket: Socket, io: Server, activeUsers: Map<string, IActiveUser>, reason: string) => Promise<void>;
//# sourceMappingURL=disconnectHandler.d.ts.map