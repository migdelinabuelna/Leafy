const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer')
const upload = multer()
//IF YOU DO NOT DEFINE THE METHOD ON THE FETCH (POST API JS FILE), THEN IT WILL AUTOMATICALLY MAKE A GET REQUEST 

//posts
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index);
router.delete('/:id', postsCtrl.delete);

//comments
router.post('/:id/comments', postsCtrl.createComment);
 
module.exports = router;