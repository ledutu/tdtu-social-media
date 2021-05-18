var express = require('express');
var passport = require('passport');
const { Post } = require('../models/post');
const { post } = require('../routes/auth');
const Response = require('../utils/response');

async function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    const posts = await Post.find({}, {}, { sort: { 'createdAt': -1 } }).populate('user').populate('comments');

    request.toastr.success('Successfully logged in.', "You're in!");

    response.render('home', { posts, request });
}

async function postArticle(request, response) {

    const { article } = request.body;

    let post = new Post({
        content: article,
        post_id: 0,
        user: request.user._id,
    });

    await post.save();

    post = await Post.findById(post._id).populate('user');

    const newResponse = Response.response(200, post);

    return response.json(newResponse)
}
async function deletePost(req, res) {
    const { post_id } = req.body;
    await Post.findByIdAndDelete(post_id,(err) => {
        if (!err) {
            return res.json({
                success: true,
            })
        }
        return res.json({
            success: false,
        })
    })
}
function postComment(request, response) {
    
}

module.exports = {
    index,
    postArticle,
    postComment,
    deletePost
}