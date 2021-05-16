var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');

/* GET users listing. */
router.get('/', HomeController.index);
router.post('/postArticle', HomeController.postArticle);

module.exports = router;
