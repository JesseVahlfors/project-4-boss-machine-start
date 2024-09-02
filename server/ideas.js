const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db');

ideasRouter.get('/', (req, res, next) => {
    try{
        const ideas = getAllFromDatabase('ideas');
        res.send(ideas); 
    } catch (err) {
        next(err);
    }
});

ideasRouter.post('/', (req, res, next) => {
    try{
        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    } catch (err) {
        next(err);
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    try{
        const idea = getFromDatabaseById('ideas', req.params.ideaId);
        if(idea) {
            res.send(idea);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    try{
        const updatedIdea = updateInstanceInDatabase('ideas', req.body);
        res.send(updatedIdea);
    } catch (err) {
        next(err);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    try{
        const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
        if(deleted) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
});


module.exports = ideasRouter;
