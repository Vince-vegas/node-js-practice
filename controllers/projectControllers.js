const fs = require('fs');

const projectsData = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/projects.json`, 'utf-8')
);

exports.checkId = (req, res, next, val) => {
  const index = parseInt(val);

  const a = projectsData.find((item) => item.id === index);

  if (a === undefined) {
    res.status(404).json({
      status: '404',
    });
  }

  next();
};

exports.homePage = (req, res) => {
  res.status(200).json({
    data: 'Homepage Content',
  });
};

exports.getAllProjects = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: projectsData.length,
    data: {
      projects: projectsData,
    },
  });
};

exports.getProject = (req, res) => {
  const index = parseInt(req.params.id);

  const project = projectsData.find((item) => item.id === index);

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};
