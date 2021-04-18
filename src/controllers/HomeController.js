var express = require('express');

function index(request, response) {
    response.cookie('lang', 'vi', { maxAge: 900000 });
    response.render('home');
}

module.exports = {
    index,
}