'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var server = 'http://localhost:' + (process.env.PORT || 3000);
require('../server.js');
chai.use(chaihttp);

describe('User Backend Tests', function() {

  it('gets the user id', function(done) {
    chai.request(server)
    .get('/user/1')
    .end(function(err, res) {
      // console.log(res.body);
      expect(err).to.eql(null);
      expect(res.body.id).to.be.a('number');
      done();
    });
  });

});
