const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Faculty } = require('./faculty');
const { User } = require('./user');

const notificationSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, default: '' },
    faculty: [{ type: Schema.Types.ObjectId, ref: Faculty }],
    user_id: { type: Schema.Types.ObjectId, ref: User },
    is_actived: { type: Boolean, default: true },
    is_blocked: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model('notification', notificationSchema);

module.exports = {
    Notification,
}
