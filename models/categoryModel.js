const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true, // bỏ các khoản trắng dư thừa vd " hello","hello "," hello " => "hello"
        // maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        // minlength: [10, 'A tour name must have more or equal then 10 characters'],
        // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    description: {
        type: String,
        required: [true, 'A tour must have a name'],
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: [true, 'Category must belong to a user']
    },
    // books: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Book",
    //     },
    // ],
        
},{timestamps: true,});


const Category = module.exports = mongoose.model('Category', CategorySchema);