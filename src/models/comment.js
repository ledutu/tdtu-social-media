const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');

const commentSchema = new Schema({
    post_id: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, require: true, ref: User },
    comment: { type: String, require: true },
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Comment,
}
