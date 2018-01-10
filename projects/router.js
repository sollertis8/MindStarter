const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Project} = require('./models');
const {Words} = require('./models');

// create a new project
router.post('/project', jsonParser, (req, res) => {
    const requiredFields = ['project_name', 'idea_word', 'relationship_type', 'sub_type', 'depth'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
    if (!(field in req.body)) {
        const message = `${field}\` is required`
        console.error(message);
        return res.status(400).send(message);
        }
    }
    // check if login credentials match and return (201) if they do 
    // or (400) if they don't
    item = Users.create(req.body.project_name, req.body.idea_word, req.body.relationship_type, req.body.sub_type, req.body.depth);
    res.status(201).json(item);
})

// Add a new word
router.put('/project/:id', jsonParser, (req, res) => {
    const requiredFields = ['word','relationship_type', 'id'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
    if (!(field in req.body)) {
        const message = `${field}\` is required`
        console.error(message);
        return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Adding new related word \`${req.params.word}\``);
    Project.update({
        id: req.params.id,
        words: req.params.word,
        relationship_type: req.params.relationship_type
    });
    res.status(204).end();
});

// delete a word relationship in a project
router.delete('/word/:id', (req, res) => {
    Words.delete(req.params.id);
    console.log(`Deleted word \`${req.params.id}\``);
    res.status(204).end();
});

// delete a project
router.delete('/project/:id', (req, res) => {
    Project.delete(req.params.id);
    console.log(`Deleted project \`${req.params.id}\``);
    res.status(204).end();
});

module.exports = router;