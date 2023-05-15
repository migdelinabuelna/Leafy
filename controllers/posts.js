const Post = require('../models/post');

const BUCKET_NAME = process.env.BUCKET
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid')

module.exports = {
    create, 
    index,
    delete: deletePost,
    createComment,
}

//POSTS

function create(req, res) {
    console.log(req.body, req.file)
    const filePath = `leafy/posts/${uuidv4()}-${req.file.originalname}`;
    const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; //req.file.buffer is the actual image

    s3.upload(params, async function(err, data) {
        if(err) {
            console.log(err, 'error from aws');
            res.status(400).json({error: 'Error from aws'})
        }

        try {
            //use our model to create a document in the posts collection in MongoDb
            const post = await Post.create({
                caption: req.body.caption,
                user: req.user, //req.user is defined in config/auth if we the client sends over the jwt token
                photoUrl: data.Location, //data.Location comes from the callback in the s3 upload
                swapstatus: req.body.swapstatus
            })

            //this response will show up on the feedPage in const responseData = await postApi.create(post;)
            res.status(201). json({data: post}) //this is what response data should be 

        } catch(err) {
            res.status(400).json({error: err})
        }

    })
}

async function index(req, res) {
    try { //empyty curly brackets means EVERYING IN Post schema
       const posts = await Post.find({}).sort({createdAt: -1}).populate('user').exec() //using model Post it will find in our database the user
       res.status(200).json({posts: posts}) //THIS IS RETURNING ALL THE POSTS JSONFIED (TURNED TO OBJECTS)
    }catch(err) {
    }
}

async function deletePost(req, res) {
    try {
         await Post.findOneAndDelete({_id: req.params.id})

        res.json({data: 'POST DELETED'})
    } catch(err){
        res.status(400).json({err})
    }
}

//COMMENTS

async function createComment(req, res) {
    try{
        console.log(req.body, 'CHECKING ADD COMMENT ERROR')
        const post = await Post.findById(req.params.id)
        post.comments.push({username: req.user.username, comment: req.body.comment.comment});
        await post.save()
        res.status(201).json({data: 'added cooment succesfully at controllers'})

    } catch(err) {
        res.status(400).json({err})
    }
}