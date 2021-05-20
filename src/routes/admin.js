var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'upload/' });
var type = upload.single('file');

const AdminController = require('../controllers/AdminController');

/* GET users listing. */
router.get('/', AdminController.index);
router.get('/post', AdminController.index);

router.get('/faculty', AdminController.postFaculty);
router.post('/register', AdminController.postRegister);

router.post('/deleteUser', AdminController.deleteUser);
router.post('/addFaculty', AdminController.addFaculty);

// router.get('/post/add', AdminController.getAddPost);
// router.post('/post/add', AdminController.postAddPost);


module.exports = router;
