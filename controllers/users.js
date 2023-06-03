const User = require('../models/user');
const Post = require('../models/post')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login, 
  profile: profilePage
};

const S3 = require('aws-sdk/clients/s3');
//initialize the constructor function
const s3 = new S3();

// npm install uuid 
//we'll use the module uuid to generate random names for our aws file
const { v4: uuidv4 } = require('uuid')

const BUCKET_NAME = process.env.BUCKET //from env file

async function signup(req, res) {
  console.log(req.body, req.file)
  if(!req.file) return res.status(400).json({error: "Please Submit a Photo!"});

  //create a path in which we want to store file in our s3 bucket
  const filePath = `leafy/${uuidv4()}-${req.file.originalname}`;
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; //req.file.buffer is the image uploaded from the client 
  s3.upload(params, async function(err, data){
    if(err){
      console.log(err, 'AWS ERROR');
      res.status(400).json({error: 'USER ALREADY EXISTS'})
    }
 
const user = new User({...req.body, photoUrl: data.Location}); //data.Location is the url of our image on AWS
try {
  await user.save();
  const token = createJWT(user);
  res.json({token});
} catch(err) {
  res.status(400).json({error: err})
}
})

}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email}); //go find the user with this email 
   
    if (!user) return res.status(401).json({err: 'bad credentials'}); //if we dont find the user with the email this will be the message
    user.comparePassword(req.body.password, (err, isMatch) => { //if we do find the user we compare passwords to make sure it is correct
      
      if (isMatch) { //if the password is correct
        const token = createJWT(user); //we create a jwt token
        res.json({token});//we send back the token back to the client
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

///this is the function that we want to make an api request to 
async function profilePage( req, res) {
  try {
    //we are using the user model to find the user by the usename
    const user = await User.findOne({username: req.params.username})
    //if we find the user
    if(!user) return res.status(404).json({error: "user not found"})

    //then we use the post model to find all the posts that belong to that user(from req.params)
    //finding all the posts by a user, and populating the user property(user property found in POSTS MODEL)
    const posts = await Post.find({user: user._id}).populate("user").exec();
    //remeber that when getting the data tha userSchema.set in model will delete hashed password 
    console.log(posts)
    //then we are sending back the posts of the user and the user
    res.status(200).json({posts: posts, user: user})
  } catch (err) {
    console.log(err)
    res.status(400).json({err})
  }
}

/*----- Helper Functions -----*/
function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
