const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const User = require('./../models/users');
var passport = require("passport");
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(require('express-session')({
    secret: "theBlog",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error : ' + err));
});


/*router.get('', (req, res) => {
    UsersModel.findUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});*/

/*router.post('/add', (req, res) => {
    UsersModel.addUser(req, (error, response) => {
        if (error) {
            console.log("Error is: ", error);
            res.send(error);
        }
        if (response) {
            req.userName = response.userName
            console.log("Success response is: ", JSON.stringify(response));
            res.send('User added successfully');
        }
    });
});*/

router.post('/add', (req, res) => {
    
    User.register(new User({ username: req.body.username ,email: req.body.email}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send('/user/add');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect('/blogs');
        })
    })
});

router.post('/login', (req, res) => {
    UsersModel.findUserForLogin(req, (error, response) => {
        if (error) {
            console.log("Error is: ", error);
            res.send(error);
        }
        if (response) {
            if (response.length > 1) {
                req.userName = response.userName
                console.log("Success response is: ", JSON.stringify(response));
                res.send('User authenticated successfully');
            } else {
                res.status(401).send('User not authenticated');
            }
        }
    });
})

/*router.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect:"/users/login"
}), function (req, res) {
    
});*/

router.put('/update', (req, res) => {
    UsersModel.updateUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;