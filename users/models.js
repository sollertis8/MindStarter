'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ChildrenSchema = mongoose.Schema({
  name: {
    type: String
  },
  size: {
    type: String
  },
  relationship: {
    type: String
  }
})

const ProjectDataSchema = mongoose.Schema({
  name: {
    _id: false,
    type: String,
    required: true,
    unique: true
  },

  idea_word: {
    _id: false,
    type: String,
    required: true,
    default: ""
  },

  relationship: {
    _id: false,
    type: String,
    required: true,
    unique: false
  },

  children: [{
    _id: false,
    type: Array,
    default: [ChildrenSchema]
  }]
})

const ProjectSchema = mongoose.Schema({
  project: [{
    type: Array,

    project_data: {
      type: [String],
      default: [ProjectDataSchema]
    }
  }]
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

ChildrenSchema.methods.serialize = function () {
  return {
    name: this.name || "",
    size: this.size || "",
    relationship: this.relationship || ""
  }
}

UserSchema.methods.serialize = function () {
  return {
    username: this.username || "",
    projects: this.projects || ""
  };
};

ProjectDataSchema.methods.serialize = function () {
  return {
    name: this.name || "",
    idea_word: this.idea_word || "",
    relationship: this.relationship || "",
    children: this.children || ""
  };
}

ProjectSchema.methods.serialize = function () {
  return {
    project: this.project || "",
    project_data: this.project_data || "",

  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};
const collection = "users";
const User = mongoose.model('User', UserSchema, collection);

module.exports = {
  User
};