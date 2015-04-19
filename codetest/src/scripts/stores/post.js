var Fluxxor     = require('fluxxor');
var constants   = require('../constants');
var _           = require('lodash');
var moment      = require('moment');
var ls          = require('local-storage');


var Store = Fluxxor.createStore({

  initialize: function(options){
    this.store = {};
    this.bindActions(
      constants.POST.LOAD, this.onLoad,
      constants.POST.ADD, this.onAdd,
      constants.POST.ADD_COMMENT, this.onAddComment
    )
  },

  onLoad: function(payload){
    this.store = _.isArray(payload) ? _.indexBy(payload, 'id') : payload;

    this.save();

    this.emit("change");
  },

  onAdd: function(payload){
    this.waitFor(["user"], function(){

      var key = _.findLastKey(this.store)  + 1;

      this.store[key] = {
        id: key,
        date: moment().format(),
        content: payload.content,
        userId: this.flux.stores.user.getCurrent().id,
        comments:[]

      };

      this.save();

      this.emit("change");
    }.bind(this));
  },

  onAddComment: function(payload){
    this.waitFor(["user"], function(){

      var post = this.get(payload.postId);

      post.comments.push({
        id: _.isEmpty(post.comments) ? 0 : _.last(post.comments).id + 1,
        content:payload.content,
        date:moment().format(),
        userId: this.flux.stores.user.getCurrent().id,
        postId: payload.postId
      });

      this.save();

      this.emit("change");

    }.bind(this))
  },

  save: function(){
    ls.set('posts', JSON.stringify(this.store))
  },

  get: function(id){
    return this.store[id]
  },

  getAll: function(){
    return this.store
  },

  getByUser: function (userId) {
    return _.filter(this.store, function(post){
      return post.userId == Number(userId)
    })
  }

});

module.exports = Store;