"use strict";

const {DATABASE_URL, PORT} = require('./config');

const express = require("express");
const app = express();
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
const uuidv4 = require('uuid/v4');

app.use(express.static("public"));
const bodyParser = require('body-parser');

const {Pet} = require('./models');

const jsonParser = bodyParser.json();
app.use(express.json());


app.post('/pets', jsonParser, (req, res) => {
  //console.log('POST /pets');
  const requiredFields = ['name', 'state'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  const id = uuidv4();
  const pet = {
    id,
    name: req.body.name,
    state: req.body.state,
  };

  Pet
    .create({
      name: req.body.name,
      state: req.body.state
    })
    .then(pet => res.status(201).json({
      _id: pet.id,
      name: pet.name,
      state: pet.state
    }))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'Something went wrong'
      });
    });
  console.log("hello");
  console.log(pet.name);
  console.log(pet.state);
  return pet.id;
});

app.get('/pets/:id', (req, res) => {
  Pet
    .findById(req.params.id)
    .then(pet => res.json(pet))
    .catch(err => {
      console.error(err);
      res.status(404).json({
        error: 'Id not found'
      });
    });
});

app.get('/pets', (req, res) => {
  //console.log(`GET /pets/${req.params.id}`);
  // const pet = {
  //   id,
  //   name: req.body.name,
  //   state: req.body.state,
  // };
  Pet
    .find()
    .then(pets => {
      res.json({
        pets: pets.map(pet => {
          return {
            id: pet._id,
            name: pet.name,
            state: pet.state
          };
        })
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'something went terribly wrong'
      });
    });
  console.log("hello world");
});

app.put('/pets/:id', (req, res) => {
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   res.status(400).json({
  //     error: 'Request path id and request body id values must match'
  //   });
  // }

  const updated = {};
  const updateableFields = ['name', 'state'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  
  Pet
  .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedPet => res.status(200).json({
    id: updatedPet.id,
    name: updatedPet.name,
    state: updatedPet.state
  }))
  .catch(err => res.status(500).json({ message: err }));
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
// this function connects to our database, then starts the server
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

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};