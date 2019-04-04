// "use strict";

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const faker = require('faker');
// const mongoose = require('mongoose'); 
// //const app = require("../server.js");

// const should = chai.should(); 
// const expect = chai.expect;

// const {Pet} = require('../models');
// const { closeServer, runServer, app } = require('../server');
// const { TEST_DATABASE_URL } = require('../config');


// chai.use(chaiHttp);

// function tearDownDb() {
//   return new Promise((resolve, reject) => {
//     console.warn('Deleting database');
//     mongoose.connection.dropDatabase()
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }

// function seedPetData() {
//   console.info('seeding pet data');
//   const seedData = [];
//   for (let i = 1; i <= 10; i++) {
//     seedData.push({
//       name: faker.name.firstName(),
//       state: 'egg',
//     });
//   }
//   // this will return a promise
//   return Pet.insertMany(seedData);
// }



// describe('pets API resource', function () {

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   beforeEach(function () {
//     return seedPetData();
//   });

//   afterEach(function () {
//     // tear down database so we ensure no state from this test
//     // effects any coming after.
//     return tearDownDb();
//   });

//   after(function () {
//     return closeServer();
//   });


//   describe('GET endpoint', function () {

//     it('should return all existing posts', function () {
//       let res;
//       return chai.request(app)
//         .get('/pets')
//         .then(_res => {
//           res = _res;
//           res.should.have.status(200);
//           res.body.should.have.lengthOf.at.least(1);

//           return Pet.count();
//         })
//         .then(count => {
//           res.body.should.have.lengthOf(count);
//         });
//     });
//   });





// describe("index page", function() {
//   it("should exist", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });

// describe("create-pet page", function() {
//   it("should exist", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });

// describe("egg-pet page", function() {
//   it("should exist", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });

// describe("pet page", function() {
//   it("should exist", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });

// describe("delete-pet page", function() {
//   it("should exist", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .then(function(res) {
//         expect(res).to.have.status(200);
//       });
//   });
// });