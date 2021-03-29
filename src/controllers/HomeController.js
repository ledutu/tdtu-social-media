var express = require('express');

function index(request, response) {
    response.render('home');
}

module.exports = {
    index,
}