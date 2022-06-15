const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users)

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.createUser = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const newUser = await User.create(req.body);
        

        const token = jwt.sign({ id:newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRWS_IN
        });


        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.cookie('jwt', token, cookieOptions);

        // // Remove password from output
        newUser.password = undefined;

        res.status(201).json({
            token,
            newUser
        });


    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.updateUser = async (req, res) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });

        res.status(200).json(newUser)

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
        })

    } catch (error) {
        res.status(400).json(error);
    }
};
