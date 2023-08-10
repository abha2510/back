const mongoose = require('mongoose');

const blacklistedTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);


module.exports = { BlacklistedToken };

