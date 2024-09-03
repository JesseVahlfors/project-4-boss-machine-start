const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');


const validateSalary = (req, res, next) =>  {
    const salary = parseFloat(req.body.salary);
    req.body.salary = salary;
    next();
}

const validateMinionId = (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);
    if(!minion) {
        return res.status(404).send({error: 'Minion not found'});
    }
    next();
}


minionsRouter.get('/', (req, res, next) => {
    try {
        const minions = getAllFromDatabase('minions');
        res.send(minions);
    } catch (err) {
        next(err);
    }
})

minionsRouter.post('/', validateSalary, (req, res, next) => {
    try {
        const newMinion = addToDatabase('minions', req.body);
        res.status(201).send(newMinion);
    } catch (err) {
        next(err);
    }
})

minionsRouter.get('/:minionId', validateMinionId, (req, res, next) => {
    try {
        const minion = getFromDatabaseById('minions', req.params.minionId);
        if (minion) {
            res.send(minion)
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
})

minionsRouter.put('/:minionId', validateSalary, validateMinionId, (req, res, next) => {
    try{
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        res.send(updatedMinion);
    } catch (err) {
        next(err);
    }
})

minionsRouter.delete('/:minionId', validateMinionId, (req, res, next) => {
    try{
        const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
        if(deleted) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
})

module.exports = minionsRouter;