var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');

/* GET users listing. */
router.get('/:page?', HomeController.index);
router.post('/postArticle', HomeController.postArticle);
router.post('/comment', HomeController.postComment);
router.get('/post/:id', HomeController.getPostDetail);
router.post('/del',HomeController.deletePost);
router.post('/deleteComment',HomeController.deleteComment);
module.exports = router;
