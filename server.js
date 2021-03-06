"use strict";

const { DATABASE_URL, PORT } = require('./config');

const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(express.static("public"));
const bodyParser = require('body-parser');

const { Pet } = require('./models');

const jsonParser = bodyParser.json();
app.use(express.json());


app.post('/pets', jsonParser, (req, res) => {
  const requiredFields = ['name', 'state'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });


  Pet
    .create({
      name: req.body.name,
      state: req.body.state
    })
    .then(pet => res.status(201).json(pet.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'Something went wrong'
      });
    });
});

app.get('/pets/:id', (req, res) => {
  Pet
    .findById(req.params.id)
    .then(pet => res.json(pet.serialize()))
    .catch(err => {
      console.error(err);
      res.status(404).json({
        error: 'Id not found'
      });
    });
});

app.get('/pets', (req, res) => {
  Pet
    .find()
    .then(pets => {
      res.json({
        pets: pets.map(pet => pet.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'something went terribly wrong'
      });
    });
});

app.put('/pets/:id', (req, res) => {
  const updated = {};
  const updateableFields = ['name', 'state'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Pet
    .findByIdAndUpdate(req.params.id, {
      $set: updated
    }, {
      new: true
    })
    .then(pet => res.status(200).json(pet.serialize()))
    .catch(err => res.status(500).json({
      message: err
    }));
});

app.delete('/pets/:id', (req, res) => {
  Pet
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted pet with id: \`${req.params.id}\``);
      res.status(204).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'something went terribly wrong'
      });
    });
})

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
