var express = require('express');
var passport = require('passport');
const { Post } = require('../models/post');
const { User } = require('../models/user');
const { Comment } = require('../models/comment');
const { Notification } = require('../models/notification');
const Response = require('../utils/response');

async function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    var page = 1;

    //set global variables
    request.app.locals.user = request.user;

    if (request.params.page) {
        page = parseInt(request.params.page)
    }

    const posts = await Post.find({}, {}, { sort: { 'createdAt': -1 } }).populate('user').populate('comments').limit(10 * page).skip(10 * (page - 1));
    const notification = await Notification.find({}, {}, { sort: { 'createdAt': -1 } }).populate('user_id').populate('faculty').limit(10);

    response.render('home', { posts, notification });
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
    await Post.findByIdAndDelete(post_id, (err) => {
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

async function deleteComment(req, res) {
    const { comment_id } = req.body;
    await Comment.findByIdAndDelete(comment_id, (err) => {
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

async function postComment(request, response) {

    const { comment, postId } = request.body;

    let commentModel = new Comment({
        post: postId,
        user: request.user._id,
        comment,
    });

    await commentModel.save();

    let postModel = await Post.findById(postId);

    postModel.comments = [commentModel._id, ...postModel.comments];

    await postModel.save();

    commentModel = await Comment.findById(commentModel._id).populate('user');

    const newResponse = Response.response(200, commentModel);

    return response.json(newResponse);
}

async function getPostDetail(request, response) {
    const { id } = request.params;

    let postModel = await Post.findById(id).populate('user').populate('comments');

    let commentModel = await Comment.find({ post: id }, {}, { 'createdAt': -1 }).populate('user');

    const newResponse = Response.response(200, {
        post: postModel,
        comments: commentModel,
        user: request.user,
    });

    return response.json(newResponse);
}

module.exports = {
    index,
    postArticle,
    postComment,
    deletePost,
    getPostDetail,
    deleteComment,
}