var express = require('express');

function index(request, response) {
    response.render('admin/home');
}

function getAddPost(request, response, next) {
    // response.render('')
}

function postAddPost(request, response, next) {
    // response.render('')
}

module.exports = {
    index,
}