const socketIO = require("socket.io");
// socketIO.set('origins', '*:*');

export class SocketGateway {
    socketServer;
    connectedUsers = {};

    async initGateway(server) {
        console.log('initGateway');
        this.socketServer = socketIO.listen(server, { transport : ['websocket'] }); // Need the http
        this.socketServer.set('origins', '*:*')
        await this.handleConnection();
        // setTimeout(() => {
        //     this.publishUsersTours(['2'])
        // }, 3000)
    }

    async handleConnection() {
        this.socketServer.on('connection', (socket) => {
            const handshake = socket.request;
            // console.log('handshake._query', handshake._query);
            const id = handshake._query.userId;
            if (id) this.connectedUsers[id] = socket;

            // console.log('hooza new connection ', socket.id)
            // console.log('total connections', Object.keys(this.connectedUsers).length)
            // console.log('connectedUsers', this.connectedUsers);
        });
    }

    async publishUsersTours(userIds: string[]) {
        const sockets = Object.keys(this.connectedUsers).filter((key) => {
            console.log(key);
            return userIds.map((u) => String(u)).includes(key);
        }).map((key) => {
            return this.connectedUsers[key];
        });

        // console.log('sockets', sockets);
        sockets.forEach((socket) => {
            socket.emit('new-tour-update');
        })
    };
}