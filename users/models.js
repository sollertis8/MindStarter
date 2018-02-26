'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ProjectSchema = mongoose.Schema({
  project_name: {
      type: String,
      required: true,
      unique: true
  },
  idea_word: {
      type: String,
      required: true,
      default: ''
  },
  relationship_type: {
      type: String,
      required: true
  },
  depth: {
      type: Number,
      required: true,
      default: '1',
  },
  size: {
      type: Number,
      required: true,
      default: '1'
  }
})

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [{
    type: Array,
    required: false,
    default: [ProjectSchema]
  }]
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

ProjectSchema.methods.serialize = function () {
  return {
      project_name: this.project_name || '',
      idea_word: this.idea_word || '',
      relationship_type: this.relationship_type || '',
      depth: this.depth || '',
      size: this.size || ''
  };
};

const collection = "users";
const User = mongoose.model('User', UserSchema, collection);


module.exports = {User};
