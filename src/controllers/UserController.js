var express = require('express');

//render profile page
function index(request, response) {
    response.render('profile');
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