var Fluxxor       = require('fluxxor');
var constants     = require('../constants');
var _             = require('lodash');

module.exports = Fluxxor.createStore({

  initialize: function(options){

    this.store = {};
    this.current = options.current;

    this.bindActions(
      constants.USER.LOAD, this.onLoad
    )

  },

  onLoad: function(payload){
    this.store = _.isArray(payload) ? _.indexBy(payload, 'id') : payload;
    this.emit("change")
  },


  getCurrent: function(){
    return this.get(this.current)
  },

  get: function(userId){
    return this.store[userId] || "NOT FOUND"
  },

  save: function(){
    ls.set('posts', JSON.stringify(this.store))
  },
});
