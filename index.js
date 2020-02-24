/*const express = require("express");
const bodyParser = require("body-parser");
require('./dbconnections');
var Users = require('./routes/users');
var Blogs = require('./routes/blogs');
const UsersModel = require('./models/users');
const session = require('express-session');
var path = require("path");


var app = express();



app.use(bodyParser.json());





//app.use('/', express.static(path.join(__dirname, './../public/')));


app.use("*", (req, res, next) => {
    console.log("Middleware is called");
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "*")
    next();
})

app.get("/", function (req, res) {
    res.send("The Blog1");
})

app.use('/users', Users);
app.use('/blogs',Blogs);//secret



app.listen(8080, () => {
    console.log('listening at 8080');
})*/

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/user');
require('./models/Survey');
require('./services/passport');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 