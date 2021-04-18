const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, index: true, require: true },
    password: { type: String, select: false, required: true, minlength: [6, "password more than 6 degits"] },
    password_hash: { type: String, select: false, required: true },
    full_name: { type: String, unique: false, default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, unique: true, index: true, required: true },
    student_id: { type: String, unique: true, require: true },
    role: { type: String, require: true },
    is_block: { type: Boolean, default: '' }
});

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
}