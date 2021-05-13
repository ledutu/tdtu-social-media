const mongoose = require('mongoose');
const { Schema } = mongoose;

const postCategorySchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, require: true },
    is_actived: { type: Boolean, default: true }
});

const PostCategory = mongoose.model('post_category', postCategorySchema);

module.exports = {
    PostCategory,
}
