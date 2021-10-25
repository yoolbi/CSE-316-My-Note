var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        location: {type: String, required: true},
    }
);

// Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/catalog/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema);