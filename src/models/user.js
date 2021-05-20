const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { Faculty } = require('./faculty');

const userSchema = new mongoose.Schema({
    googleId: { type: String, index: true, default: '' },
    username: { type: String, index: true, require: true },
    password: { type: String, select: false },
    password_hash: { type: String, select: false },
    full_name: { type: String, unique: false, default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, index: true, required: true },
    student_id: { type: String, require: true },
    image: { type: String, default: '' },
    background_image: { type: String, default: '/assets/images/banner/default-background.jpg' },
    faculty_id: [{ type: Schema.Types.ObjectId, ref: Faculty }],
    introduce: { type: String, default: '' },
    friends: { type: Array, default: [] },
    role: { type: String, require: true },
    is_block: { type: Boolean, default: '' }
}, { timestamps: true });

userSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username }).select('password_hash').exec(function (err, user) {
        if (err) return callback(err);
        else if (!user) {
            var err = new Error('User not found.');
            return callback(err);
        }

        bcrypt.compare(password, user.password_hash, function (err, result) {
            if (result) return callback(null, user);
            else return callback();
        })
    })
}

const User = mongoose.model('users', userSchema);

module.exports = {
    User,
}