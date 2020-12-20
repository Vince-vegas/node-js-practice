const Project = require('../models/projectModel');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: '404',
      message: error,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: '404',
      message: error,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const createdProject = await Project.create(req.body);

    res.status(201).json({
      status: 'success',
      data: createdProject,
    });
  } catch (error) {
    res.status(404).json({
      status: '404',
      message: error,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: updatedProject,
    });
  } catch (error) {
    res.status(404).json({
      status: '404',
      message: error,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      status: '404',
      message: error,
    });
  }
};
