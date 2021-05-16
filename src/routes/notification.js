var express = require('express');
var router = express.Router();

const NotificationController = require('../controllers/NotificationConTroller');

/* GET users listing. */
router.get('/', NotificationController.index);
router.get('/detail', NotificationController.getNotificationDetail);

module.exports = router;
