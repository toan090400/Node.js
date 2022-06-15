var express = require('express');
var router = express.Router();

const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');

router.use(authController.isLoggedIn);

router
    .route('/')
    .get(categoryController.getAllCategorys)
    .post(
        // authController.protect,
        // authController.restrictTo('true'),
        categoryController.createCategory
    );

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(
        // authController.protect,
        // authController.restrictTo('true'),
        categoryController.updateCategory
    )
    .delete(
        // authController.protect,
        // authController.restrictTo('true'),
        categoryController.deleteCategory
    );

module.exports = router;