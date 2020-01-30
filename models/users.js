const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    sEnabled: Boolean
})

UserSchema.plugin(passportLocalMongoose);

UsersModel = mongoose.model("Users", UserSchema);


/*UsersModel.findUser = function (req, callBack) {

    UsersModel.find({ userName: req.userName }, callBack);
}*/

UsersModel.findUserForLogin = function (req, callBack) {
    let user = { userName: req.body.userName, password: req.body.password };
    UsersModel.find(user, callBack);
}

UsersModel.addUser = function (req, callBack) {
    let user = req.body;
    UsersModel.create(user, callBack);
}
/*
UsersModel.updateUsers = function (req, callBack) {
    let query = { _id: req.body._id };
    let user = req.body;
    UsersModel.updateOne(query, user, callBack);
}*/

module.exports = UsersModel;