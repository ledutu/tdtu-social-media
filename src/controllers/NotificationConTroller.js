var express = require('express');
const { User } = require('../models/user');
const { Notification } = require('../models/notification');
const { Faculty } = require('../models/faculty');

async function index(request, response) {
    const { faculty_id } = request.query;
    console.log(faculty_id)
    if (faculty_id) {
        notification = await Notification.find({ faculty: faculty_id }, {}, { sort: { 'createdAt': -1 } }).populate('user_id').populate('faculty')
    } else {
        notification = await Notification.find({}, {}, { sort: { 'createdAt': -1 } }).populate('user_id').populate('faculty')
    }

    faculty = await Faculty.find({});

    response.render('notification', { notification, faculty });
}

async function getNotificationDetail(request, response) {
    const { id } = request.params;

    const notification = await Notification.findById(id).populate('user_id').populate('faculty');

    response.render('notification-detail', { notification });
}

module.exports = {
    index,
    getNotificationDetail,
}