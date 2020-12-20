const express = require('express');
const projectsRouter = require('./routes/projectsRouter');
const app = express();
app.use(express.json());

app.use('/projects', projectsRouter);

module.exports = app;
