var express = require('express');
const { Faculty } = require('../models/faculty');
const { User } = require('../models/user');
const { Post } = require('../models/post');
const { Notification } = require('../models/notification');
const Response = require('../utils/response');
const bcrypt = require('bcrypt');

async function index(request, response) {
    request.app.locals.session = request.session;
    request.app.locals.user = request.user;
    faculty = await Faculty.find({});
    users = await User.find({}).populate('faculty_id');
    response.render('admin/home', { faculty, users, messages: '' });
}

function getAddPost(request, response, next) {
    // response.render('')
}

function postAddPost(request, response, next) {
    // response.render('')
}

async function postRegister(request, response, next) {
    request.session.err = '';
    const {
        username,
        password,
        full_name,
        email,
        image,
        faculty_id,
        role,
    } = request.body;

    const existUser = await User.findOne({ username });

    if (existUser) {
        request.session.err = 'Username exists'
        return response.redirect('back')
    };

    const salt = bcrypt.genSaltSync(12);
    const password_hash = bcrypt.hashSync(password, salt);

    const user = new User({
        username,
        password,
        password_hash,
        full_name,
        email,
        image,
        faculty_id,
        role,
    });

    await user.save()

    response.redirect('back');

}

async function postFaculty(request, response, next) {

    faculties = await Faculty.find({});
    response.render('admin/faculty', { faculties });
}

async function addFaculty(request, response) {

    const { name, key_name } = request.body;

    let faculty = new Faculty({ name, key_name });
    await faculty.save();
    return response.render('admin/faculty');
}

async function deleteUser(req, res) {
    const { user_id } = req.body;
    await User.findByIdAndDelete(user_id, (err) => {
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

async function getNotification(request, response) {
    faculty = await User.findById(request.user._id).populate('faculty_id');
    notification = await Notification.find({}).populate('user_id').populate('faculty');
    return response.render('admin/notification', { faculty: faculty.faculty_id, notification })
}

async function postNotification(request, response) {
    // faculty = await Faculty.find({});

    const { content, faculty_id, title } = request.body;

    const notification = new Notification({
        title,
        content,
        faculty: faculty_id,
        user_id: request.user._id,
    });

    await notification.save();

    return response.redirect('back');
}

async function deleteNotification(request, response) {
    const { id } = request.params;

    await Notification.findByIdAndDelete(id);

    return response.redirect('back');
}

async function getPost(request, response) {
    const post = await Post.find({});

    return response.render('admin/post', { post })
}

async function deletePost(request, response) {
    const { id } = request.params;

    await Post.findByIdAndDelete(id);

    return response.redirect('back');
}

module.exports = {
    index,
    getPost,
    postRegister,
    postFaculty,
    addFaculty,
    deleteUser,
    getNotification,
    postNotification,
    deleteNotification,
    deletePost
}