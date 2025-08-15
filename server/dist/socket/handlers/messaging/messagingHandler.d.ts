import { Socket, Server } from 'socket.io';
import { IActiveUser } from '../../store/userStore';
export declare const setupMessagingHandlers: (socket: Socket, io: Server, activeUsers: Map<string, IActiveUser>) => void;
//# sourceMappingURL=messagingHandler.d.ts.map