'use strict';

var Post = require('../models/postModel.js');

module.exports = function(app) {

  //create a new post and saves to the database
  app.post('/post/:id', function(req, res) {
    var post = new Post({
      id: req.body.id,
      userId: req.params.userId,
      content: req.body.cnt
    });
    post.save(function(err, data) {
      if (err) {
        return (err);
      }
      res.json(data);
    });
  });

  // get all post comments
  app.get('/posts/:limit', function(req, res) {
    Post
    .where('id').lt(10)
    .limit(req.params.limit)
    .exec(function(err, results) {
      if (err) return res.status(500).send('there was an error');
      if (!results) return {};
      if (results) res.json(results);
    });
  });

  //adds a reply to a comment
  app.post('/addComment/:id', function(req, res) {
    Post
    .findOne({id: req.params._id})
    .exec(function(err, feed) {
      feed.addComments({
        userId: req.body.author,
        content: req.body.cnt
      });
      feed.save(function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.json(data);
      });
    });
  });
};
