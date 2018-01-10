const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', function(req, res){
    res.sendFile('/index.html', {root: ('./views')});
  });

// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
//   });

router.get('/signup', function(req, res){
    res.sendFile('/signup.html', {root: ('./views')});
  });

router.get('/login', function(req, res){
    res.sendFile('/login.html', {root: ('./views')});
  });

router.get('/account', function(req, res){
    res.sendFile('/account.html', {root: ('./views')});
  });

router.get('/project', function(req, res){
    res.sendFile('/project.html', {root: ('./views')});
  });

module.exports = router;