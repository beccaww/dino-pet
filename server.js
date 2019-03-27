"use strict";

const express = require("express");
const app = express();
//mongoose.Promise = global.Promise;

app.use(express.static("public"));

const {PET} = require('./models');

//app.use(express.json());


app.post('/pets', (req, res) => {
  //console.log('POST /pets');
  const requiredFields = ['name', 'state'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  PET
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
});


app.get('/pets/:id', (req, res) => {
  console.log(`GET /pets/${req.params.id}`);
  PET
  .find()
  .then(pets => {
    res.json(pets.map(pet => {
      return {
        id: pet._id,
        name: pet.name,
        state: pet.state
      };
    }));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'something went terribly wrong' });
  });
});

app.listen(8080);

// if (require.main === module) {
//   app.listen(process.env.PORT || 8080, function () {
//     console.info(`App listening on ${this.address().port}`);
//   });
// }

module.exports = app;