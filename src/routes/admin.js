var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');

/* GET users listing. */
router.get('/', AdminController.index);

router.get('/faculty', AdminController.postFaculty);
router.post('/register', AdminController.postRegister);

router.post('/deleteUser', AdminController.deleteUser);
router.post('/addFaculty', AdminController.addFaculty);

router.get('/notification', AdminController.getNotification)
router.post('/notification', AdminController.postNotification)
router.get('/delete-notification/:id', AdminController.deleteNotification)

router.get('/post', AdminController.getPost)
router.get('/delete-post/:id', AdminController.deletePost)

module.exports = router;
