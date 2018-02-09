//initial setup

const express = require('express');
const apiRouter = express.Router();

//router import

const artistsRouter = require('./artists');
const seriesRouter = require('./series');

//router links

apiRouter.use('/artists', artistsRouter);
//apiRouter.use('/series', seriesRouter);

//router export

module.exports = apiRouter;
