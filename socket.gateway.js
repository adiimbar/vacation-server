const socketIO = require("socket.io");

class SocketGateway {
    connectedUsers = [];

    async initGateway(httpServer) {
        this.socketServer = socketIO.listen(httpServer); // Need the http
        await this.handleConnection();
    }

    async handleConnection() {
        
    }
}