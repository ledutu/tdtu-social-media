const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: { type: String, require: true },
    key_name: { type: String },
}, { timestamps: true });

const Faculty = mongoose.model('faculty', facultySchema);

module.exports = {
    Faculty,
}
