var express = require('express');
const { User } = require('../models/user');
const Helpers = require('../utils/helpers');

async function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    request.toastr.success('Successfully logged in.', "You're in!");
    response.render('auth', { messages: request.flash('login-fail') });
}

function loginWithGoogle(request, response) {
    response.redirect('/');
}

async function checkLoginWithGoogle(accessToken, refreshToken, profile, done) {

    if (profile._json.email.split('@')[1] != "student.tdtu.edu.vn") {
        return done(null, null);
    }

    User.findOne({ googleId: profile.id }, async function (err, existUser) {
        user = existUser;
        if (!user) {
            user = new User({
                googleId: profile.id,
                username: '',
                password: '',
                password_hash: '',
                full_name: profile.displayName,
                birthday: '',
                email: profile._json.email,
                student_id: profile._json.email.split('@')[0],
                image: profile._json.picture,
                role: 0,
                is_block: false,
            })

            await user.save();
        }
        return done(null, user);
    })
}

function logout(request, response) {
    request.logout();
    response.redirect('/');
}

//Admin login
function postLogin(request, response) {
    const { username, password } = request.body;
}

module.exports = {
    index,
    loginWithGoogle,
    checkLoginWithGoogle,
    logout,
    postLogin,
}