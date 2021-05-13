const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, require: true },
    content: { type: String, default: '' },
    post_id: { type: String, require: true },
    user_id: { type: String, require: true },
    is_actived: { type: Boolean, default: true },
    is_blocked: { type: Boolean, default: false },
});

const Post = mongoose.model('post', PostSchema);

module.exports = {
    Post,
}
