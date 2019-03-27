'use strict';

const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;



var petSchema = mongoose.Schema({
  name: 'string',
  state: 'string',
});


// var petInteractionSchema = mongoose.Schema({

// })

petSchema.methods.serialize = function () {
  return {
    id: this._id,
    name: this.name,
    state: this.state
  }
};

const Pet = mongoose.model('Pet', petSchema);

module.exports = {Pet};
