var express = require('express');
const { User } = require('../models/user');
const { Post } = require('../models/post');

//render profile page
async function index(request, response) {
    var { id } = request.params;
    // console.log(id);
    var profileUser = await User.findById(id).populate('faculty_id');
    var page = 1;

    if (request.params.page) {
        page = parseInt(request.params.page)
    }

    const posts = await Post.find({ user: { _id: id } }).limit(10 * page).populate('user').populate('comments').skip(10 * (page - 1));
    response.render('profile', { profileUser: profileUser, posts: posts, request });
}

module.exports = {
    index,
}