const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');

const PostSchema = new Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    youtube_link: { type: String, default: '' },
    image: { type: Array, default: [] },
    post_id: { type: String, require: true },
    is_actived: { type: Boolean, default: true },
    is_blocked: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: User },
}, { timestamps: true });

const Post = mongoose.model('post', PostSchema);

module.exports = {
    Post,
}
