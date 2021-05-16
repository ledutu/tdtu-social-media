const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, require: true },
    key_name: { type: String },
}, { timestamps: true });

const Faculty = mongoose.model('faculty', facultySchema);

module.exports = {
    Faculty,
}
