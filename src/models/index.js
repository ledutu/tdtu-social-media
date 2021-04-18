<<<<<<< Updated upstream
const Comment = required('./comment.js');
const Favourite = required('./favourite.js');
const Notification = required('./notification.js');
const NotificationCategory = required('./notification-category.js');
const PostCategory = required('./post-category.js');
const Post = required('./post.js');
const UserRole = required('./user-role.js');

module.exports = {
    Comment,
    Favourite,
    Notification,
    NotificationCategory,
    PostCategory,
    Post,
    UserRole,
=======
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, index: true, require: true  },
    password: { type: String, select: false, required: true, minlength:[6, "password more than 6 degits"] },
    password_hash: { type: String, select: false, required: true },
    full_name:{type: String, unique: false, default: ''},
    birthday: {type: Date, default: ''},
    email: {type: String, unique: true, index: true, required: true},
    student_id: {type: String, unique: true, require: true},
    role: {type: String, require: true},
    is_block: {type: Boolean, default: ''}
});

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
>>>>>>> Stashed changes
}