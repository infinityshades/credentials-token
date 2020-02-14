const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: String,
    username: String,
    password: String
}, {timestamps: true})

userSchema.plugin(plm); //using passport-local-mongoose as a plug in S
const userCollection = mongoose.model('user', userSchema);
module.exports = userCollection