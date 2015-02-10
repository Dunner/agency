// models/sound.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var postSchema = new Schema({
    name : String,
    slug : String,
    createdAt: Date,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);

