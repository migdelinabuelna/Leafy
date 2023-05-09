//this is where we check the token before we get to our routes in server file


const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function (req, res, next) {
// 1 we check to get the token out of our authorization header
  let token = req.get("Authorization") || req.query.token || req.body.token; 
  if (token) { // 2 if we find the token 
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", ""); // 3 we get the token
    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function (err, decoded) { // 4 then we verify the token 
      if (err) {
        next(err);
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user; // 5 if the token is good it gets decoded here and we assign it to req.user
        //this makes req.user available in every controller function 
        next();
      }
    });
  } else {
    next();
  }
};
