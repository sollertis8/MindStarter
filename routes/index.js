const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', {
    session: false
});
ObjectID = require('mongodb').ObjectID;

const {
    Project
} = require('../projects/models');

const {
    User
} = require('../users/models');

router.get('/', function (req, res) {
    res.sendFile('/index1.html', {
        root: ('./views')
    });
});


router.get('/signup', function (req, res) {
    res.sendStatus(200);
});

// get user project page and projects
router.get('/user/profile', jsonParser, jwtAuth, (req, res) => {
    console.log(req.params);
    const user_id = req.params.id;
    Project.find({
        user_id: user_id
    }, (err, projects) => {
        if (err) {
            console.log(err);
        }

        console.log(projects);
        //    data.push(projects);
        //    console.log(project);

        if (projects != null) {
            // console.log(data)

            res.json(projects);
        } else {
            res.sendStatus(200);
        }
    })
});


// update a project
router.put('/project/:id', jsonParser, jwtAuth, (req, res) => {
    console.log(req.body);
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body.id}) must match`);
        console.error(message);
        // we return here to break out of this function
        return res.status(400).json({
            message: message
        });
    }

    const toUpdate = {};
    const updateableFields = ['project', 'project_data', 'name', 'idea_word', 'relationship', 'children', 'size'];
    console.log("REQ", req.body)
    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    console.log(req.params.id)
    Project
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        })
        .then(project => res.json(project))

        .catch(err => res.status(500).json({
            message: err
        }));
});


// create a new project
router.post('/project', jsonParser, (req, res) => {
    const requiredFields = ['project'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    console.log("REQ", req.body)

    Project
        .insertMany([req.body])
        .then(project => res.status(201).json(project))
        .catch(err => res.status(500).json({
            message: err
        }));
});


router.get('/login', (req, res) => {
    res.sendFile('/login.html', {
        root: ('./views')
    });
});

router.get('/user/account', jwtAuth, function (req, res) {
    res.send();
});


module.exports = router;