const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer')
const upload = multer()


//public routes
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index);


module.exports = router;