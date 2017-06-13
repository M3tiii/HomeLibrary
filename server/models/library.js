// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var librarySchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  data: [{
    id: String,
    free: Boolean
  }],
  members: [{
    username: String,
  }]
});

// the schema is useless so far
// we need to create a model using it
var Library = mongoose.model('Library', librarySchema);

// make this available to our users in our Node applications
module.exports = Library;
