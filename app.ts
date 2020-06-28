const express = require("express");
const http = require("http"); // More basic server than express.

const server = express();
const httpServer = http.createServer(server); // Need express
const SocketGateway = require('./socket.gateway').SocketGateway;
const socketGateway = new SocketGateway();

const fs = require("fs");
const cors = require("cors");

// const userIdToSocketsMap = new Map();

const port = process.env.PORT || 3001;

// const uuid = require("uuid");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');



const errorHandler = require('./middleware/error-handler');
// const loginFilter = require('./middleware/login-filter');

const usersController = require('./controllers/users-controller');
const vacationsController = require('./controllers/vacations-controller');
const filesController = require('./controllers/files-controller');
const followersController = require('./controllers/followers-controller');


if (!fs.existsSync("./uploads")) { // create "/uploads" folder if not exist.
    fs.mkdirSync("./uploads");
}


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.use(fileUpload());
server.use(express.json());
// let nextID = 1;


// server.use(loginFilter());
server.use(errorHandler);

server.use('/users', usersController);
server.use('/tours', vacationsController);
server.use('/uploads', filesController);
server.use('/follow', followersController);


const app = server.listen(port, () => console.log("Listening on http://localhost: " + port));

socketGateway.initGateway(app);

// module.exports = {
    export const exportSocketGateway = socketGateway
    // export const exportSocketGateway = socketGateway
// }