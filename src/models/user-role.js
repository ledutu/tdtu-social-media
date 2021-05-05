const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, require: true },
    is_actived: { type: Boolean, default: true }
});

const UserRole = mongoose.model('user_role', userRoleSchema);

module.exports = {
    UserRole,
}
