const express = require("express");
const router = express.Router();
path = require('path');
const uuid = require("uuid");


// get image
router.get("/:name", (request, response)=>{       
    // Extracting the filename
    let fileName = request.params.name;

    let imgPath = path.join(__dirname, '../uploads/'+fileName);

    let fullQualifiedFileName = imgPath;
    
    response.sendFile(fullQualifiedFileName);
})

// upload image
router.post("/", (request, response) => {

    // need to use authorizationString to validate that the user is admin

    try {      

        // Extract the uploaded image
        // IMPORTANT - The "image" property is implanted by the "express-fileupload"
        // middleware
        const file = request.files.file;

        // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip)
        const extension = file.name.substr(file.name.lastIndexOf("."));
     
        // Generating a unique identifier for each file
        let newUuidFileName = uuid.v4();

        let newFileName = newUuidFileName + extension;
        
        // we move the file into the uploads directory
        let imgPath = path.join(__dirname, '../uploads/');
        file.mv(imgPath + newFileName);
        
        let successfulUploadResponse = {name:newFileName};

        // returning the product object
        response.status(200).json(successfulUploadResponse);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;
