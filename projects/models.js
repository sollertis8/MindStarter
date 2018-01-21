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
    // sub_type: {
    //     type: String,
    //     required: true,
    //     default: ''
    // },
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

ProjectSchema.methods.serialize = function() {
    return {
      project_name: this.project_name || '',
      idea_word: this.idea_word || '',
      relationship_type: this.relationship_type || '',
    //   sub_type: this.sub_type || '',
      depth: this.depth || '',
      size: this.size || ''
    };
  };
  const collection = "projects";
  const Project = mongoose.model('Project', ProjectSchema, collection);

  module.exports = {Project};

