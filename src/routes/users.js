var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/profile/:id?/:page?', UserController.index);
router.get('/about', UserController.getAbout);
router.get('/photo', UserController.getPhoto);
router.get('/friend', UserController.getFriend);

module.exports = router;
