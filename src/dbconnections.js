const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    usseCreateIndex: true
}, (error) => {
    if (!error) {
        console.log("Mongo Conection Successful .....");
    }
    else {
        console.log("Error Connecting.....");
    }
});

/*var db = mongoose.connection;
db.on('error', function () {
    console.log("Error connecting to db")
})

db.once('open', function () {
    console.log("Connected to db")
})*/