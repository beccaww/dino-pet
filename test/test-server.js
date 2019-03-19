'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);


describe('GET endpoint', function () {

    it('should return status 200', function () {
      let res;
      return chai.request()
        .get('/')
        .then(
          res.should.have.status(200)
        )
    })
});
