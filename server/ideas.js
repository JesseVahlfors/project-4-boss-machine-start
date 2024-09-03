const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

const validateIdeaId = (req, res, next) =>  {
    const ideaId = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', ideaId);
    if(!idea) {
        return res.status(404).send({error: "Idea not found"});
    }
    next();
};

const validateIdeaNumbers = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body;

    if(numWeeks !== undefined) {
        req.body.numWeeks = parseFloat(numWeeks);
        if(isNaN(req.body.numWeeks)) {
            return res.status(404).send({ erro: "numWeeks must be a number" });
        }
    }

    if(weeklyRevenue !== undefined) {
        req.body.weeklyRevenue = parseFloat(weeklyRevenue);
        if(isNaN(req.body.weeklyRevenue)) {
            return res.status(404).send({ erro: "weeklyRevenue must be a number" });
        }
    }

    next();   
}

ideasRouter.get('/', (req, res, next) => {
    try{
        const ideas = getAllFromDatabase('ideas');
        res.send(ideas); 
    } catch (err) {
        next(err);
    }
});

ideasRouter.post('/', validateIdeaNumbers, checkMillionDollarIdea, (req, res, next) => {
    try{
        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    } catch (err) {
        next(err);
    }
});

ideasRouter.get('/:ideaId', validateIdeaId, (req, res, next) => {
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

ideasRouter.put('/:ideaId', validateIdeaId, validateIdeaNumbers, (req, res, next) => {
    try{
        const updatedIdea = updateInstanceInDatabase('ideas', req.body);
        res.send(updatedIdea);
    } catch (err) {
        next(err);
    }
});

ideasRouter.delete('/:ideaId', validateIdeaId, (req, res, next) => {
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
