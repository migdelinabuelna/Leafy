require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("./config/database");

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.json()); // makes http requests available on req.body


// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth")); //ALL OF THE ROUTES HAVE TO GO TROUGH THIS AND THEN DECODE THE TOKEN BEFORE THEY CONTINUE WITH THE ROUTE
// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use('/api/posts', require('./routes/api/posts'));

// "catch all" route // any requests sent to our express server(localhost8000) is going to send out index.html file
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const port = process.env.PORT || 3001;




const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
