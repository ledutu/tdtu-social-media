var express = require('express');
const { Faculty } = require('../models/faculty');
const { User } = require('../models/user');

async function index(request, response) {
    request.app.locals.user = request.user;
    faculty = await Faculty.find({});
    users = await User.find({}).populate('faculty_id');
    console.log(users)
    response.render('admin/home', { faculty, users });
}

function getAddPost(request, response, next) {
    // response.render('')
}

function postAddPost(request, response, next) {
    // response.render('')
}

function postRegister(request, response, next) {

}

function postFaculty(request, response, next) {
    response.render('admin/faculty');
}
module.exports = {
    index,
    getAddPost,
    postAddPost,
    postRegister,
    postFaculty,
}