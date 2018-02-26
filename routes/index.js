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
router.get('/user/:userId/project', jwtAuth, urlencodedParser, (req, res) => {
    
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

    const options = {
        root: ('./views'),
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }
    Project
          const pid = this.params.id
        .create({
            project_name: req.body.project_name,
            idea_word: req.body.idea_word,
            relationship_type: req.body.relationship_type,
            depth: req.body.depth
        })
        .then(
            res.status(201).send()
            
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
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