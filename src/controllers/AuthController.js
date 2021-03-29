var express = require('express');

function index(request, response) {
    response.render('auth');
}

module.exports = {
    index,
}