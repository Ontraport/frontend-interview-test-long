'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
  id: Number,
  userId: Number,
  date: { type: Date, default: Date.now },
  content: String,
  comments: [Schema.Types.Mixed]
});

PostSchema.methods.addComments = function(obj) {
  this.comments.push(obj);
};

module.exports = mongoose.model('Post', PostSchema);
