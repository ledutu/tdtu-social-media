var express = require('express');
var router = express.Router();

const NotificationController = require('../controllers/NotificationController');

/* GET users listing. */
router.get('/', NotificationController.index);

module.exports = router;
