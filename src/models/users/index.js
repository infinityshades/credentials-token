const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: String
}, {timestamps: true})

const userCollection = mongoose.model('users', userSchema);