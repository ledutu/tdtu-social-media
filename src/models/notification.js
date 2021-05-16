const mongoose = require('mongoose');
const { Schema } = mongoose;
const Faculty = require('./faculty');

const notificationSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    faculty: { type: Schema.Types.ObjectId, ref: Faculty },
    user_id: { type: String, required: true },
    is_actived: { type: Boolean, default: true },
    is_blocked: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model('notification', notificationSchema);

module.exports = {
    Notification,
}
