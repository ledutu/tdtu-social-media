var express = require('express');
const { Faculty } = require('../models/faculty');
const { User } = require('../models/user');
const Response = require('../utils/response');

async function index(request, response) {
    request.app.locals.user = request.user;
    faculty = await Faculty.find({});
    faculties = await Faculty.find({});
    users = await User.find({}).populate('faculty_id');
    response.render('admin/home', { faculty, users });
}

function getAddPost(request, response, next) {
    // response.render('')
}

function postAddPost(request, response, next) {
    // response.render('')
}

function postRegister(request, response, next) {
    console.log(request.body);
}

function postFaculty(request, response, next) {
    response.render('admin/faculty');
}

async function addFaculty(request, response) {

    const { name,key_name } = request.body;

    let faculty = new Faculty({ name,key_name });
    await faculty.save();
    return response.render('admin/faculty');
}

module.exports = {
    index,
    getAddPost,
    postAddPost,
    postRegister,
    postFaculty,
    addFaculty,
}