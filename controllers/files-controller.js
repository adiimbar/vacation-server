const express = require("express");
const router = express.Router();
path = require('path');

// const server = express();
// const router = express.Router();
// const uuid = require("uuid");
// const fileUpload = require("express-fileupload");

// server.use(fileUpload());
// server.use(express.json());
// let nextID = 1;


// get image
router.get("/:name", (request, response)=>{       
    // Extracting the filename
    let fileName = request.params.name;

    let imgPath = path.join(__dirname, '../uploads/'+fileName);
    console.log(imgPath);
    console.log(fileName);
    console.log(__dirname);

    let fullQualifiedFileName = imgPath;
    // let fullQualifiedFileName = __dirname + "../uploads/"+fileName;
    
    response.sendFile(fullQualifiedFileName);
})

// // upload image
// router.post("/uploads", (request, response) => {
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
//         file.mv("../uploads/" + newFileName);
        
//         let successfulUploadResponse = {name:newFileName};
//         console.log(successfulUploadResponse);

//         // returning the product object
//         response.status(200).json(successfulUploadResponse);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });


module.exports = router;
