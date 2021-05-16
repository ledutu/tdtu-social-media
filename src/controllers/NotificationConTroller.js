var express = require('express');

function index(request, response) {
    response.render('notification');
}

module.exports = {
    index,
}