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
    res.sendStatus(200);
});

router.get('/user/profile', (req, res) => {
    res.sendStatus(200);
    });
  

// create a new project
router.put('/project/:id', jsonParser, (req, res) => {
    
    const {userId} = req.params.id;
    const message = `hit endpoint with user_id ${req.params.id}`;
    const requiredFields = ['name', 'idea_word'];

    // for (let i = 0; i < requiredFields.length; i++) {
    //     const field = requiredFields[i];
    //     if (!(field in req.body)) {
    //         const message = `${field}\ is required in request body`
    
    //         console.error(message);
    //         return res.status(400).send(message);
    //     }
    // }   
    // if (req.params.id !== req.body.id) {
    //     const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    //     console.error(message);
    //     return res.status(400).send(message);
    //   }
    //   console.log(`updating user \`${req.params.id}\``);

     try { 
    User

    // .insertMany([userId, req.body.project]);
        .update({
            _id: ObjectId(req.params.id)},
            { $set:
            {projects: req.body,
            }
        })
    
            res.status(204).send(message);
     } catch (e) {
        res.status(500).send(e);
     }

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