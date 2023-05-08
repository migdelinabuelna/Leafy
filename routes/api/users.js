const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
//we need to install Multer and then import it
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
//multer then is added to the route that will handle our file/photo upload
//'photo' comes from the key on the form-data object we created on the signup component page 
router.post("/signup", upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



