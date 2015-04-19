var constants = require('./constants.json');

var actions = {

  user:{
    load: function(users){
      this.dispatch(constants.USER.LOAD, users)
    }
  },

  post:{
    load: function(posts){
      this.dispatch(constants.POST.LOAD, posts)
    },
    add: function(content){
      this.dispatch(constants.POST.ADD, {content:content})
    },
    addComment: function(content, postId){
      this.dispatch(constants.POST.ADD_COMMENT, {content:content, postId: postId})
    }
  }
};

module.exports = actions;