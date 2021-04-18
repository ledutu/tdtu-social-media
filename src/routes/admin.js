var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');

/* GET users listing. */
router.get('/', AdminController.index);

module.exports = router;
