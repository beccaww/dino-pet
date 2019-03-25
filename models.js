'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var petSchema = mongoose.Schema({
    name: 'string',
    state: 'string',
  });


var petInteractionSchema = mongoose.Schema({
    
})

const PET = mongoose.model('PET', petSchema);

module.exports = {PET};
  