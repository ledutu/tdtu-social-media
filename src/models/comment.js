const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    post_id: { type: String, require: true },
    user_id: { type: String, require: true },
    commment: { type: String, require: true },
});

const CommentCategory = mongoose.model('comment', commentSchema);

module.exports = {
    CommentCategory,
}
