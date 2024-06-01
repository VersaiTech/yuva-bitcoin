const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    admin_user_id: { type: String, required: true, ref: 'Admin' },
    
}, { timestamps: true });

const Permission = mongoose.model('Permission', PermissionSchema);
module.exports = Permission