const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema(
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
    
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    description: {
        type: String,
        required: [true, 'A tour must have a name'],
        trim: true
    },
    image: {
        type: String,
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: [true, 'Review must belong to a user']
    }
        
},{timestamps: true,});


const Book = module.exports = mongoose.model('Book', BookSchema);