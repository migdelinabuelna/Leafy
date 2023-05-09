const Post = require('../models/post');

const BUCKET_NAME = process.env.BUCKET
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid')

module.exports = {
    create, 
    index
}



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
    try {
       const posts = await Post.find({}).populate('user').exec()
       res.status(200).json({posts})
    }catch(err) {
    }
}