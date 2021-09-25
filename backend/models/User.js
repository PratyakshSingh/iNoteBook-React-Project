const mongoose = require('mongoose');
const { Schema } = mongoose;
var uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})
UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);
module.exports = User;
