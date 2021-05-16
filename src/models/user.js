const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    googleId: { type: String, index: true, default: '', unique: true },
    username: { type: String, index: true, require: true },
    password: { type: String, select: false },
    password_hash: { type: String, select: false },
    full_name: { type: String, unique: false, default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, unique: true, index: true, required: true },
    student_id: { type: String, unique: true, require: true },
    image: { type: String, default: '' },
    background_image: { type: String, default: '/assets/images/banner/default-background.jpg' },
    faculty_id: { type: Number },
    introduce: { type: String, default: '' },
    friends: { type: Array, default: [] },
    role: { type: String, require: true },
    is_block: { type: Boolean, default: '' }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
}