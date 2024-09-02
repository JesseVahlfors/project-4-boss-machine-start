const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db');
const errorhandler = require('errorhandler')


minionsRouter.get('/', (req, res, next) => {
    try {
        const minions = getAllFromDatabase("minions");
        res.send(minions);
    } catch (err) {
        next(err);
    }
})

minionsRouter.post('/', (req, res, next) => {
    try {
        const newMinion = addToDatabase(req.body);
        res.status(201).send(newMinion);
    } catch (err) {
        next(err);
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    try {
        const minion = getFromDatabaseById(req.params.minionId);
        if (minion) {
            res.send(minion)
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
})

minionsRouter.put('/:minionId', (req, res, next) => {
    try{
        
    } catch (err) {
        next(err);
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    try{
        
    } catch (err) {
        next(err);
    }
})

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
  }

module.exports = minionsRouter;
