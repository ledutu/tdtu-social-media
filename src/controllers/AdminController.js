var express = require('express');
const { Faculty } = require('../models/faculty');
const { User } = require('../models/user');
const { Notification } = require('../models/notification');
const Response = require('../utils/response');
const bcrypt = require('bcrypt');
const Resize = require('../utils/resize');
const path = require('path')

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

    // console.log('image', request.file);

    // response.send(request.file)

    const existUser = await User.findOne({ username });

    // // folder upload
    // const imagePath = path.join(__dirname, '/public/assets/images/upload/');
    // // call class Resize
    // const fileUpload = new Resize(imagePath);

    // const filename = await fileUpload.save(image.buffer);

    if (existUser) {
        request.session.err = 'Username exists'
        return response.redirect('back')
    };

    password_hash = await bcrypt.hashSync(password, 12);

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

function postFaculty(request, response, next) {
    response.render('admin/faculty');
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
    faculty = await Faculty.find({});
    notification = await Notification.find({}).populate('user_id').populate('faculty');
    
    console.log(notification)

    return response.render('admin/notification', { faculty, notification })
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

module.exports = {
    index,
    getAddPost,
    postAddPost,
    postRegister,
    postFaculty,
    addFaculty,
    deleteUser,
    getNotification,
    postNotification,
}