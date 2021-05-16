var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const ENVIROMENT = require('../utils/enviroment');
const { User } = require('../models/user');
const AuthController = require('../controllers/AuthController');

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (id, done) {
    return done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: ENVIROMENT.client_id,
    clientSecret: ENVIROMENT.client_secret,
    callbackURL: "/auth/google/callback",
}, AuthController.checkLoginWithGoogle));

/* GET users listing. */
router.get('/', AuthController.index);

// Login with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth',
    }),
    AuthController.loginWithGoogle
);
router.get('/logout', AuthController.logout)

module.exports = router;
