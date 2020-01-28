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
const app = express();

app.get('/', (req, res) => {
    res.send({
        hi: "ther" });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);