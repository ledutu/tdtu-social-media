var express = require('express');
const { User } = require('../models/user');
const { Post } = require('../models/post');

//render profile page
async function index(request, response) {
    var { id } = request.params;
    // console.log(id);
    var user = await User.findById(id).lean();
    var page = 1;

    if (request.params.page) {
        page = parseInt(request.params.page)
    }

    const posts = await Post.find({user:{_id:id}}).limit(10 * page).populate('user').populate('comments').skip(10 * (page - 1));
    console.log(posts)
    response.render('profile',{user:user,posts:posts, request});
}

function getAbout(request, response) {
    response.render('about');
}

function getPhoto(request, response) {
    response.render('photo');
}

function getFriend(request, response) {
    response.render('friend');
}

module.exports = {
    index,
    getAbout,
    getPhoto,
    getFriend,
}