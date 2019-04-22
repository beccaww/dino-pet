"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const { Pet } = require('../models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');


chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedPetData() {
  console.info('seeding pet data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      name: faker.name.firstName(),
      state: 'egg',
    });
  }
  return Pet.insertMany(seedData);
}



describe('pets API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedPetData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });


  describe('GET endpoint', function () {

    it('should return all existing pets', function () {
      let res;
      return chai.request(app)
        .get('/pets')
        .then(_res => {
          res = _res;
          res.should.have.status(200);

          return Pet.count();
        });
    });

    it('should return pets with right fields', function () {

      let resPet;
      return chai.request(app)
        .get('/pets')
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');

          res.body.pets.forEach(function (pet) {
            pet.should.be.a('object');
            pet.should.include.keys('id', 'name', 'state');
          });
          resPet = res.body.pets[0];
          return Pet.findById(resPet.id);
        })
        .then(pet => {
          resPet.name.should.equal(pet.name);
          resPet.state.should.equal(pet.state);
        });
    });
  });

  it('should return pet with right fields', function () {
    return Pet.insertMany({
      name: faker.name.firstName(),
      state: 'egg',
    }).then(values => {
      const pet = values[0];
      return chai.request(app)
        .get('/pets/' + pet._id)
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          const p = res.body;
          p.should.be.a('object');
          p.should.include.keys('id', 'name', 'state');
        });
    });
  });
});


describe('POST endpoint', function (done) {

  it('should add a new pet', function () {

    const newPet = {
      name: faker.name.firstName(),
      state: 'egg'
    };

    return chai.request(app)
      .post('/pets')
      .send(newPet)
      .then(function (res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'id', 'name', 'state');
        res.body.name.should.equal(newPet.name);
        res.body.id.should.not.be.null;
        res.body.state.should.equal(newPet.state);
        return Pet.findById(res.body.id);
      })
      .then(function (pet) {
        pet.name.should.equal(newPet.name);
        pet.state.should.equal(newPet.state);
      });
  });
  done(); 
});

describe('PUT endpoint', function () {

  it('should update fields you send over', function () {
    const updateData = {
      name: 'name',
      state: 'pet',
    };

    return Pet
      .findOne()
      .then(pet => {
        updateData.id = pet.id;

        return chai.request(app)
          .put(`/pets/${pet.id}`)
          .send(updateData);
      })
      .then(res => {
        res.should.have.status(200);
        return Pet.findById(updateData.id);
      })
      .then(pet => {
        pet.name.should.equal(updateData.name);
        pet.state.should.equal(updateData.state);
      });
  });
});

describe('DELETE endpoint', function () {

it('should delete a pet by id', function () {

  let pet;

  return Pet
    .findOne()
    .then(_pet => {
      pet = _pet;
      return chai.request(app).delete(`/pets/${pet.id}`);
    })
    .then(res => {
      res.should.have.status(204);
      return Pet.findById(pet.id);
    })
    .then(_pet => {
      should.not.exist(_pet);
    });
});
}); 




describe("index page", function () {
  it("should exist", function () {
    return chai
      .request(app)
      .get("/")
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe("egg-pet page", function () {
  it("should exist", function () {
    return chai
      .request(app)
      .get("/egg-pet.html")
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe("pets page", function () {
  it("should exist", function () {
    return chai
      .request(app)
      .get("/pets.html")
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});