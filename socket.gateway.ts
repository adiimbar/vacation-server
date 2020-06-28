const socketIO = require("socket.io");
// socketIO.set('origins', '*:*');

// got some help from a friend

export class SocketGateway {
    socketServer;
    connectedUsers = {};

    async initGateway(server) {
        this.socketServer = socketIO.listen(server, { transport : ['websocket'] }); // Need the http
        this.socketServer.set('origins', '*:*')
        await this.handleConnection();
    }

    async handleConnection() {
        this.socketServer.on('connection', (socket) => {
            const handshake = socket.request;
            const id = handshake._query.userId;
            if (id) this.connectedUsers[id] = socket;

        });
    }

    async publishUsersTours(userIds: string[]) {
        const sockets = Object.keys(this.connectedUsers).filter((key) => {
            return userIds.map((u) => String(u)).includes(key);
        }).map((key) => {
            return this.connectedUsers[key];
        });

        sockets.forEach((socket) => {
            socket.emit('new-tour-update');
        })
    };

    publishNewTourToUsers(newTour: Object) {
        const sockets: any = Object.values(this.connectedUsers);

        sockets.forEach((socket) => {
            
            socket.emit('new-tour', newTour);
        })

    }

    publishUpdatedTourToUsers(updatedTour: Object) {

        const sockets: any = Object.values(this.connectedUsers);

        sockets.forEach((socket) => {
            socket.emit('tour-update', updatedTour);
        })
    }
}