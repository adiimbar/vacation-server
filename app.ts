const express = require("express");
const http = require("http"); // More basic server than express.

const server = express();
const httpServer = http.createServer(server); // Need express
const SocketGateway = require('./socket.gateway').SocketGateway;
const socketGateway = new SocketGateway();

// const fs = require("fs");
const cors = require("cors");

// expressServer.use(express.static(__dirname)); // Serve index.html

const userIdToSocketsMap = new Map();


const port = process.env.PORT || 3001;
// const path = require('path');

// const config = require('./config.json');
// const jwt = require('jsonwebtoken');

// const bodyParser = require('body-parser');
const uuid = require("uuid");
const fileUpload = require("express-fileupload");

// const usersCache = new Map();

const errorHandler = require('./middleware/error-handler');
// const loginFilter = require('./middleware/login-filter');

const usersController = require('./controllers/users-controller');
const vacationsController = require('./controllers/vacations-controller');
const filesController = require('./controllers/files-controller');
const followersController = require('./controllers/followers-controller');


// if (!fs.existsSync("./uploads")) { // create "/uploads" folder if not exist.
//     fs.mkdirSync("./uploads");
// }


server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
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

// server.use("/files", imagesController);


// // get image
// server.get("/uploads/:name", (request, response)=>{       

//     let fileName = request.params.name;

//     let fullQualifiedFileName = __dirname + "/uploads/"+fileName;
    
//     response.sendFile(fullQualifiedFileName);
// })

// // upload image
// server.post("/file", (request, response) => {
//     try {      

//         // Extract the uploaded image
//         // IMPORTANT - The "image" property is implanted by the "express-fileupload"
//         // middleware
//         const file = request.files.file;

//         // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip)
//         const extension = file.name.substr(file.name.lastIndexOf("."));
     
//         // Generating a unique identifier for each file
//         let newUuidFileName = uuid.v4();

//         let newFileName = newUuidFileName + extension;
        
//         // we move the file into the uploads directory
//         file.mv("./uploads/" + newFileName);
        
//         let successfulUploadResponse = {name:newFileName};
//         // console.log(successfulUploadResponse);

//         // returning the product object
//         response.status(200).json(successfulUploadResponse);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });


const app = server.listen(port, () => console.log("Listening on http://localhost: " + port));

socketGateway.initGateway(app);