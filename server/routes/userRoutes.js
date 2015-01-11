'use strict';

var User = require('../models/userModel.js');

module.exports = function(app) {
  //get user id
  app.get('/user/:id', function(req, res) {
    User.findOne({id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });
};
