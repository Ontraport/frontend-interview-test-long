'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  id: Number,
  username: String,
  pic: String,
  about: String
});

module.exports = mongoose.model('User', UserSchema);
