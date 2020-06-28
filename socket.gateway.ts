const socketIO = require("socket.io");
// socketIO.set('origins', '*:*');

// got some help from a friend

export class SocketGateway {
    socketServer;
    connectedUsers = {};

    async initGateway(server) {
        // console.log('initGateway');
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
            // console.log(key);
            return userIds.map((u) => String(u)).includes(key);
        }).map((key) => {
            // console.log('this.connectedUsers[key]:', this.connectedUsers[key])
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

        // console.log('in publishUpdatedTourToUsers')

        const sockets: any = Object.values(this.connectedUsers);

        sockets.forEach((socket) => {
            socket.emit('tour-update', updatedTour);
        })
    }
}