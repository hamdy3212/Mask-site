const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchemca = new mongoose.Schema({
    username: String,
    password: String
});
UserSchemca.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchemca);