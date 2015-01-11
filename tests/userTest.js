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

  it('gets a list of users', function(done) {
    chai.request(server)
    .get('/users/10')
    .end(function(err, res) {
      // console.log(res.body);
      expect(err).to.eql(null);
      expect(res.body[0].id).to.be.a('number');
      expect(res.body[1].username).to.be.a('string');
      expect(res.body[2].pic).to.be.a('string');
      expect(res.body[3].about).to.be.a('string');
      done();
    });
  });
});
