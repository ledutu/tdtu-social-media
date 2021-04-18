var express = require('express');
const { User } = require('../models/user');

async function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    const user = {
        username: 'admin',
        password: 'admin123',
        password_hash: '$2y$12$PUbG8DAEua73eQ8uXSUpRuURRpT9niOoxdOS8bbnuaRwtxfPeDmea',
        full_name: 'ADMIN',
        birthday: '02/01/1999',
        email: 'admin@gmail.com',
        student_id: '123123121212',
        role: 1,
        is_block: false,
    }

    // const userModel = new User(user);


    console.log(user)
    response.render('auth');
}

module.exports = {
    index,
}