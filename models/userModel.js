const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: [true, 'A tour must have a name'],
        // unique: true,
        trim: true, // bỏ các khoản trắng dư thừa vd " hello","hello "," hello " => "hello"
        
    },
    password: {
        type: String,
        required: [true, 'A tour must have a name'],
        trim: true, // bỏ các khoản trắng dư thừa vd " hello","hello "," hello " => "hello"
        select: false // select khi lay database thi khong hien thi password
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
        
},{timestamps: true,});


const User = module.exports = mongoose.model('User', UserSchema);