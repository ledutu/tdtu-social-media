var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');

/* GET users listing. */
router.get('/', AdminController.index);
router.get('/post', AdminController.index);

router.post('/register', AdminController.postRegister)

// router.get('/post/add', AdminController.getAddPost);
// router.post('/post/add', AdminController.postAddPost);


module.exports = router;
