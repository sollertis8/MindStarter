const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const cookieParser = require('cookie-parser')

const jwtAuth = passport.authenticate('jwt', { session: false });
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
    res.sendFile('/signup.html', {
        root: ('./views')
    });
});

router.get('/user/profile', (req, res) => {
    // const {userId} = req.params;
    res.sendStatus(200);
    User
        .findOne({
            _id: ObjectID(req.params.userId)  
        })
        // .then(user => res.json({
        //     projects: user.projects
        // }))

    });
  

// create a new project
router.put('/user/:userId/project', jwtAuth, jsonParser, (req, res) => {
    
    const userId = req.user._id;
    
    const requiredFields = ['project_name', 'idea_word', 'relationship_type', 'depth'];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `${field}\ is required in request body`
    
            console.error(message);
            return res.status(400).send(message);
        }
    }   
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
      }
      console.log(`updating user \`${req.params.id}\``);
   
    User
        .update({
            id: req.params.id,
            project_id: uuid.v4(),
            project_name: req.body.project_name,
            idea_word: req.body.idea_word,
            relationship_type: req.body.relationship_type,
            depth: req.body.depth
        });
    
            res.status(204).end();
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