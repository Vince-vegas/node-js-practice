const express = require('express');
const projectRouter = require('./routes/projects');

const app = express();
app.use(express.json());

// ROUTES

app.use('/projects', projectRouter);

module.exports = app;
