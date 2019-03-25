"use strict";

const express = require("express");
const app = express();
mongoose.Promise = global.Promise;

app.use(express.static("public"));

const { PET } = require('./models');

const app = express(); 

app.use(express.json());


app.post('/pets', (req, res) => {
  console.log('POST /pets');
  res.end(); 
});


app.get('/pets/:id', (req, res) => {
  console.log(`GET /pets/${req.params.id}`);
  res.end(); 
});

app.listen(8080);

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;