var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
const ENVIROMENT = require('../utils/enviroment');
const { User } = require('../models/user');
const AuthController = require('../controllers/AuthController');

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    return done(null, user);
    // User.findById(id._id, function (err, user) {
    // });
});

passport.use(new GoogleStrategy({
    clientID: ENVIROMENT.client_id,
    clientSecret: ENVIROMENT.client_secret,
    callbackURL: "/auth/google/callback",
}, AuthController.checkLoginWithGoogle));

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.authenticate(username, password, async (err, res) => {
            if (res) {
                const user = await User.findById(res._id);
                return done(null, user)
            } else {
                return done(null, false);
            }
        })
    }
));

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

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/flash',
        failureFlash: true
    }),
    AuthController.postLogin
)

module.exports = router;
