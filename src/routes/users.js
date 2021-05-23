var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/profile/:id?/:page?', UserController.index);

module.exports = router;
