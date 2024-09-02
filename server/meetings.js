const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    try {
        const meetings = getAllFromDatabase('meetings');
        res.send(meetings);
    } catch(err) {
        next(err);
    }
})

meetingsRouter.post('/', (req, res, next) => {
     try {
        const createdMeeting = createMeeting();
        const newMeeting = addToDatabase('meetings', createdMeeting);
        res.status(201).send(newMeeting)
    } catch(err) {
        next(err);
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    try {
        deleteAllFromDatabase('meetings');
        res.status(204).send();
    } catch(err) {
        next(err);
    }
})

module.exports = meetingsRouter;
