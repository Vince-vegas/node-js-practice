const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false,
  },
  rating: {
    type: Number,
    required: true,
    default: 4.5,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
