const express = require('express');
const {
  getAllProjects,
  getProject,
  checkId,
} = require('../controllers/projectControllers');
const projectRouter = express.Router();

projectRouter.param('id', checkId);

projectRouter.route('/').get(getAllProjects);
projectRouter.route('/:id').get(getProject);

module.exports = projectRouter;
