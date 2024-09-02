const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions')
app.use('/minions', minionsRouter);

const ideasRouter = require('./ideas')
app.use('/ideas', ideasRouter);

const meetingsRouter = require('./meetings')
app.use('/meetings', meetingsRouter);

module.exports = apiRouter;
