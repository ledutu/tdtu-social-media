var express = require('express');
var passport = require('passport');
const { Post } = require('../models/post');
const Response = require('../utils/response');

async function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    const posts = await Post.find({}).populate('user');
    console.log(posts)
    response.render('home', { posts });
}

async function postArticle(request, response) {

    const { article } = request.body;

    let post = new Post({
        content: article,
        post_id: 0,
        user: request.user._id,
    });

    await post.save();

    const data = await Post.find({});

    const newResponse = Response.response(200, data);

    return response.json(newResponse)
}

module.exports = {
    index,
    postArticle
}