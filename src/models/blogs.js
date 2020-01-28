const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    content: String
})

const BlogsModel = mongoose.model("Books", blogSchema);

BlogsModel.findBlogs = function (req, callBack) {
    let id = req.query.id;
    let query = {};
    if (id) {
        query = { _id: id }
    }
    BlogsModel.find(query, callBack);
}

BlogsModel.addBlog = function (req, callBack) {
    let book = req.body;
    BlogsModel.create(book, callBack);
}

BlogsModel.updateBlog = function (req, callBack) {
    let query = { _id: req.body._id };
    let book = req.body;
    BlogsModel.updateOne(query, book, callBack);
}

BlogsModel.deleteBlog = function (req, callBack) {
    let query = { _id: req.query.id };
    BlogsModel.deleteOne(query, callBack);
}

module.exports = BlogsModel;
