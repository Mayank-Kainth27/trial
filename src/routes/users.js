const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const UsersModel = require('./../models/users');


var app = express();
app.use(bodyParser.json());







/*router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error : ' + err));
});*/


router.get('', (req, res) => {
    UsersModel.findUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/add', (req, res) => {
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
});

/*router.post('/add', (req, res) => {
    
    User.register(new User({ firstName: req.body.firstName, LastName: req.body.LastName, email: req.body.email,username: req.body.username }), req.body.password, function (err, user) {
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