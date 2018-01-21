const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
    Project
} = require('./models');
const {
    Words
} = require('./models');

// load a project
// router.get('/project', (req, res) => {
//     Project
//     .findById(req.params.id)
//     .then(project =>
//         res.json(project.serialize()))
//         .catch(
//             err => {
//                 console.error(err);
//                 res.status(500).json({message: 'Internal server error'});
//             });
//     });

router.get('/project', (req, res) => {
    res.sendFile('/project.html', {
        root: ('./views')
    });
});

// create a new project
router.post('/project', jsonParser, (req, res) => {
    // req.setHeader('content-type', 'application/json');
    const requiredFields = ['project_name', 'idea_word', 'relationship_type', 'depth'];
    console.log(req.body);
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `${field}\` is required in request body`
            console.error(message);
            return console.log(req.body); 
            // res.status(400).send(message);
        }
    }
    Project
        .create({
            project_name: req.body.project_name,
            idea_word: req.body.idea_word,
            relatiohship_type: req.body.relationship_type,
            depth: req.body.depth
        })
        .then(
            project => res.status(201).json(project.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
        item = Project.create(req.body.project_name, req.body.idea_word, req.body.relationship_type, req.body.depth);
res.status(201).json(item);
});


// Add a new word
router.put('/project/:id', jsonParser, (req, res) => {
    const requiredFields = ['word', 'relationship_type', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
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