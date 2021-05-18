const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');
// const { Post } = require('./post');

const commentSchema = new Schema({
    post: { type: Schema.Types.ObjectId },
    user: { type: Schema.Types.ObjectId, ref: User },
    comment: { type: String, require: true },
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Comment,
}
