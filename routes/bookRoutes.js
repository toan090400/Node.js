var express = require('express');
var router = express.Router();

const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

router.use(authController.isLoggedIn);

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;