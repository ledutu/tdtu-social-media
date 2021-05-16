var express = require('express');
var router = express.Router();

const NotificationController = require('../controllers/NotificationConTroller');

/* GET users listing. */
router.get('/', NotificationController.index);

module.exports = router;
