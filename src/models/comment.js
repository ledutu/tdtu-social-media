const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    post_id: { type: String, require: true },
    user_id: { type: String, require: true },
    comment: { type: String, require: true },
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Comment,
}
