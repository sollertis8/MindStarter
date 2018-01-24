const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const jwtAuth = passport.authenticate('jwt', { session: true });
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

router.get('/user/:userId/project', jwtAuth, urlencodedParser, jsonParser, (req, res) => {
    const authToken = res.headers.Authorization
    console.log(authToken);
    // const authToken = myHeader.Authorization;
    // get user's projects
    // Projects.find({
    //     userId: req.params.userId 
    // });
    res.sendFile('/project.html', {
                root: ('./views')
            });
    User
        .findOne({
            _id: ObjectID(req.params.userId)  
        })
        .then(function(user){
            const options = {
                root: ('./views'),
                headers: {
                  'Authorization': 'Bearer ' + authToken
                }
              }
            
        });
    });
  

// create a new project
router.post('/user/:userId/project', jwtAuth, urlencodedParser, jsonParser, (req, res) => {
    // res.setHeader('content-type', 'application/json');
    // const size = "1";
    const authToken = res.headers.Authorization;
    console.log(authToken);
    // const authToken = myHeader.Authorization;
    const requiredFields = ['project_name', 'idea_word', 'relationship_type', 'depth'];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `${field}\ is required in request body`
            console.log(req.body);
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
    res.sendFile('/project.html', options
                // headers: {
                //     userId: req.user._id
                // }
            
            )

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

// router.post('/login', function (req, res){

//     res.get('/user/:userId/project')
// })  
// const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/account', jwtAuth, function (req, res) {
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

// // gets relationship data from the api
// function getDataFromApi(word, relationship, depth, callback) {
//     const settings = {
//         data: {
//            ml: `${meansLike}`,
//            sl: `${soundsLike}`,
//            sp: `${spelledLike}`,
//            rl_jja: `${popularNounModified}`,
//            rl_syn: `${synonym}`,
//            rl_ant: `${antonym}`,
//            topics: `${topic}`,
//            max: `${depth}`
//         },
//         url: 'https://api.datamuse.com/words',
//         dataType: 'json',
//         type:'GET',
//         success: callback
//     };
//         $.ajax(settings)
//     }

//     // allows user to get autocomplete feedback
//     function autoComplete(callback) {
//        const settings = {
//            url: 'https://api.datamuse.com/sug',
//            dataType: 'json',
//            type: 'GET',
//            success: callback
//        };
//        $.ajax(settings)
//     }

//     // displays user project
//     function displayProject() {

//     }

//     function getUserProject(projectName) {
//     const words = {};
//     const relationships = {};
//     const relationship = "";
//     const depth = "";

//     }

//     function displayUserProject() {

//     }

//     function generateBrainstorm() {

//     }

//     function createProject() {
//         Project
//     .findOne()
//     .then(project => res.json({
//         name: project.name,
//         size: restaurant.size
//     }))
//     .catch(err => {
//         console.error(err)
//         res.status(500).json({message: 'Something went wrong'})}
//     );
//     }

//     function loadProject() {
//         Project
//         .findOne()
//         .then(project => res.json({
//             name: project.name,
//             id: project.id
//         }))
//         .catch(err => {
//             console.error(err)
//             res.status(500).json({message: 'Something went wrong'})}
//         );
//     }


//     function circleSize() {
//         var adjust_size = function(circle){
//             var size = circle.height()+10;
//             circle.width(size).height(size);
//         };

//         $.each($('.circle'), function(index, circle){
//                 adjust_size($(circle));
//         });
//     }


module.exports = router;
// module.exports = Project;