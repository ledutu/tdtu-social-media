const mongoose = require('mongoose');
const { Schema } = mongoose;

const favouriteSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    post_id: { type: String, require: true },
    user_id: { type: String, require: true },
});

const Favourite = mongoose.model('favourite', favouriteSchema);

module.exports = {
    Favourite,
}
