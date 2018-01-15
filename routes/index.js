const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
  Project
} = require('../projects/models');

// require('../projects/index');

// const {
//   Words
// } = require('./models');

// const {Project} = require('../projects/models');
// const {Project_router} = require('../projects/router');
// const {Projects} = require('../projects/index.js');

router.get('/', function(req, res){
    res.sendFile('/index.html', {root: ('./views')});
  });
  
// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
//   });

router.get('/signup', function(req, res){
    res.sendFile('/signup.html', {root: ('./views')});
  });

router.get('/project', (req, res) => {
    res.sendFile('/project.html', {
        root: ('./views')
    });
});


// create a new project
router.post('/project', jsonParser, (req, res) => {
  const requiredFields = ['project_name', 'idea_word', 'relationship_type', 'depth'];
  for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
          const message = `${field}\ is required in request body`
          console.error(message);
          return res.status(400).send(message);
      }
  }
  Project
      .create({
          project_name: req.body.project_name,
          idea_word: req.body.idea_word,
          relationship_type: req.body.relationship_type,
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
});



router.get('/login', function(req, res){
    res.sendFile('/login.html', {root: ('./views')});
  });

router.get('/account', function(req, res){
    res.sendFile('/account.html', {root: ('./views')});
  });

// const project = require('../projects/index');

// router.use('/project', project);

// router.post('/project', function(req, res){
//     res.sendFile('/router.js', {root: ('./projects')});
//   });
// module.exports = {router, Project, Project_router};
module.exports = router;