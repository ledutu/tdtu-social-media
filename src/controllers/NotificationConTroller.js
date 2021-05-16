var express = require('express');

function index(request, response) {
    response.render('notification');
}

function getNotificationDetail(request, response) {
    response.render('notification-detail');
}

module.exports = {
    index,
    getNotificationDetail
}