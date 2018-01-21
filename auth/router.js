'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  const userId = req.user._id;
  console.log(req.user._id);
  res.status(200).send;
  res.redirect(`/user/:${userId}/project`);
  // req.get({url: 'http://localhost:8080/user/:userId/project', headers: req.headers});
  // processRequest(req);
  // res.setHeader('Content-Type', 'application/json');
  // res.json({authToken});
  // res.send(`/users/:${userId}/projects`);
  // res.sendFile('/project.html', {root: ('./views')});
  
  // next();

});


// router.get('/user/:userId/project', (req, res) => {
//   res.status(200);
//   res.sendFile('/project.html', {
//     root: ('./views')
// });
// })


const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
