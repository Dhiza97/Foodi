const mongoose = require('mongoose')
const {Schema} = mongoose

// Create schema object for Users
const userSchema = new Schema({
    name: String,
    email: {type: String, trim: true, minlength: 3},
    password: {type: String, required: true},
    photoURL: String,
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
})

// Create a model using the schema
const User = mongoose.model('User', userSchema)

module.exports = User 