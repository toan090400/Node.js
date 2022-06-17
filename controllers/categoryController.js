const Category = require('../models/categoryModel');

exports.getAllCategorys = async (req, res) => {
    try {
        const categorys = await Category.find();
        // console.log(res.locals.user);
        res.status(200).json(categorys);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        .populate({
            path: 'user',
            select: '-__v',
        });

        res.status(200).json(category)

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.createCategory = async (req, res) => {
    try {
        
        const newCategory = await Category.create(req.body);
        
        res.status(200).json({
            newCategory,
            message: 'Thêm mới thành công',
        })

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.updateCategory = async (req, res) => {
    try {
        // const books = await Book.find();
        const newCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            newCategory,
            message:'Cập nhập thành công!'
        })

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Xóa thành công',
        });

    } catch (error) {
        res.status(400).json(error);
    }
};