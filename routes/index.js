const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const router = express.Router();
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
    res.sendStatus(200);
});

router.get('/user/profile', (req, res) => {
    res.sendStatus(200);
    });
  

// create a new project
router.put('/project/:id', jsonParser, (req, res) => {
    // const data = JSON.stringify(req.body);
    
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (
          `Request path id (${req.params.id}) and request body id ` +
          `(${req.body.id}) must match`);
        console.error(message);
        // we return here to break out of this function
        return res.status(400).json({message: message});
      }
    
      const toUpdate = {};
      const updateableFields = ['project', 'project_data', 'name', 'idea_word','relationship', 'children', 'size'];
    
      updateableFields.forEach(field => {
        if (field in req.body) {
          toUpdate[field] = req.body[field];
        }
      });
    
      User
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(user => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
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