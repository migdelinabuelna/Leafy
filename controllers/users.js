const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
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
      res.status(400).json({error: 'Check Your Terminal'})
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
  // const user = new User(req.body);
  // try {
  //   await user.save();
  //   const token = createJWT(user);
  //   res.json({ token });
  // } catch (err) {
  //   // Probably a duplicate email
  //   res.status(400).json(err);
  // }
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

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
