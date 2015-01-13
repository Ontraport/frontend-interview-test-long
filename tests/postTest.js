'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var server = 'http://localhost:' + (process.env.PORT || 3000);
require('../server.js');
chai.use(chaihttp);

describe('Post Backend Tests', function() {
  it('creates a new post and saves to the database', function(done) {
    chai.request(server)
      .post('/post/546e84559fdea70b002bb182')
      .send({cnt:'this is content for testing', comments:'this is comment for testing'})
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.content).to.be.a('string');
        done();
      });
  });

  it('gets a list of post comments', function(done) {
    chai.request(server)
      .get('/posts/10')
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body[0].id).to.be.a('number');
        expect(res.body[0].content).to.be.a('string');
        expect(res.body[0].comments).to.be.a('array');
        done();
      });
  });

  it('adds a reply to a comment', function(done) {
    chai.request(server)
      .post('/addComment/546e84559fdea70b002bb182')
      .send({author:'TestingUser01', cnt:'this is content for testing'})
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.comments[0]).to.be.a('object');
        done();
      });
  });
});
