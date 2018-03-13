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
    user_id: {
        type: String,
        required: true,
        unique: false
    },

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
        project: {
            type: Array,
            unique: true,
        project_name: {
            type: String
        },
        
      project_data: [{
        type: Array,
        default: [ProjectDataSchema]
      }]
    }
  })


  ChildrenSchema.methods.serialize = function () {
    return {
      name: this.name || "",
      size: this.size || "",
      relationship: this.relationship || ""
    }
  }

  ProjectDataSchema.methods.serialize = function () {
    return {
      user_id: this.user_id || "",
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

const collection = "projects";
const Project = mongoose.model('Project', ProjectSchema, collection);

module.exports = {
    Project
};