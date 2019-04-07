'use strict';

const mongoose = require('mongoose');



var petSchema = mongoose.Schema({
  name: 'string',
  state: 'string',
});


petSchema.methods.serialize = function () {
  return {
    id: this._id,
    name: this.name,
    state: this.state
  }
};

const Pet = mongoose.model('Pet', petSchema);

module.exports = {Pet};
