'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = function (user) {
  return jwt.sign({
    user
  }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};


const localAuth = passport.authenticate('local', {
  session: false
});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  const userId = req.user._id;
  // console.log(authToken);
  
  // const auth = 'Bearer ' + authToken;
  //   root: ('./views'),
  const options = {
    root: ('./views'),
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  }
  // req.headers.authorization = ('bearer ' + authToken); 
   res.sendFile('/profile.html', options);
  
  // res.json({authToken});
  // make 301 redirect
  // res.header('Authorization', auth);
  // res.cookie('access_token', authToken, {httpOnly: false}).header('Authorization', auth).status(301).redirect(`/user/${userId}/project`);
  // res.cookie('access_token', authToken, {httpOnly: false}).header('Authorization', auth).status(301).sendfile('/profile.html');
  
});


const jwtAuth = passport.authenticate('jwt', {
  session: false
});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({
    authToken
  });
});

module.exports = {
  router
};