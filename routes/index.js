const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

// const authorizationHeader = require('authorization-header');

const cookieParser = require('cookie-parser')

const jwtAuth = passport.authenticate('jwt', { session: false });
ObjectID = require('mongodb').ObjectID;

const {
    Project
} = require('../projects/models');



const {
    User
} = require('../users/models');
// const {
//     Mindstarter
// } = require('../mindstarter/models');

// require('../projects/index');

// const {
//   Words
// } = require('./models');

// const {Project} = require('../projects/models');
// const {Project_router} = require('../projects/router');
// const {Projects} = require('../projects/index.js');

router.get('/', function (req, res) {
    res.sendFile('/index.html', {
        root: ('./views')
    });
});

// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
//   });

router.get('/signup', function (req, res) {
    res.sendFile('/signup.html', {
        root: ('./views')
    });
});

router.get('/user/profile', jwtAuth, jsonParser, (req, res) => {
    const authToken = req.header('Authorization');
    // const auth = 'Bearer ' + authToken;
    const {userId} = req.params;
    console.log(auth);
    // const authToken = myHeader.Authorization;
    // get user's projects
    // Projects.find({
    //     userId: req.params.userId 
    // });
    // res.header('Authorization', auth);
    // res.cookie('access_token', authToken, {httpOnly: false}).status(301)
    res.sendFile('/profile.html', {
                root: ('./views')
            });
    User
        .findOne({
            _id: ObjectID(req.params.userId)  
        })
        // .then(function(user){
        //     const options = {
        //         root: ('./views'),
        //         headers: {
        //           'Authorization': 'Bearer ' + authToken
        //         }
        //       }
            
        // });
    });
  

// create a new project
router.post('/user/:userId/project', jwtAuth, urlencodedParser, jsonParser,(req, res) => {
    
    // const userId = req.user._id;
    
    // const authToken = createAuthToken(req.user);
    // res.headers.authorization = ('Bearer ' + 'authToken');
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
        //   const pid = this.params.id
        .create({
            project_name: req.body.project_name,
            idea_word: req.body.idea_word,
            relationship_type: req.body.relationship_type,
            depth: req.body.depth
            //   size: size
        })
        .then(
            // console.log(authToken);
            res.sendfile('/project.html', options).status(201).send()
            
        )
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });

});

// router.post('/login', jwtAuth, jsonParser, (req, res) => {
//         const options = {
//                 root: ('./views'),
//                 headers: {
//                   'Authorization': 'Bearer ' + authToken
//                 }
//             }
//     res.sendFile('/profile.html')
// });


router.get('/login', (req, res) => {
    res.sendFile('/login.html', {
        root: ('./views')
    });
});

// router.post('/login', function (req, res){

//     res.get('/user/:userId/project')
// })  
// const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/user/account', jwtAuth, function (req, res) {
    res.sendFile('/account.html', {
        root: ('./views'),
        headers: {
            userId: req.user._id
        }
    });
});

// const project = require('../projects/index');

// router.use('/project', project);

// router.post('/project', function(req, res){
//     res.sendFile('/router.js', {root: ('./projects')});
//   });
// module.exports = {router, Project, Project_router};


module.exports = router;
// module.exports = Project;