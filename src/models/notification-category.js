const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationCategorySchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, require: true },
    is_actived: { type: Boolean, default: true }
});

const NotificationCategory = mongoose.model('notification_category', notificationCategorySchema);

module.exports = {
    NotificationCategory,
}
