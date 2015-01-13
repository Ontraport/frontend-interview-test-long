'use strict';

var User = require('../models/userModel.js');

module.exports = function(app) {
  //get a user id
  app.get('/user/:id', function(req, res) {
    User.findOne({id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //get list of users (10)
  app.get('/users/:limit', function(req, res) {
    User
    .where('id').lt(10)
    .limit(req.params.limit)
    .exec(function(err, results) {
      if (err) return res.status(500).send('there was an error');
      if (!results) return {};
      if (results) res.json(results);
    });
  });
};
