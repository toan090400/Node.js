var express = require('express');
var router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;