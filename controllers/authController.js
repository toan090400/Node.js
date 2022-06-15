const User = require('../models/userModel');
////////////////////////////////////////////////////////
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

// const crypto = require('crypto');
const { promisify } = require('util');

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // 1) Check if email and password exist
        if (!username || !password) {
            return next('Please provide username and password!');
        }
        
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return next('Incorrect username');
        }

        const correct = await bcrypt.compare(password,user.password);
        
        if (!correct) {
            return next('Incorrect password');
        }

        // // 3) If everything ok, send token to client
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
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
        user.password = undefined;

        res.status(201).json({
            token,
            user,
        });



    } catch (error) {
        console.log(error);
        res.status(400).json(error);

    }
}

exports.protect = async (req, res, next) => {
    try {

        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }else if (req.cookies.jwt){
            token = req.cookies.jwt;
        }
        if (!token) {
            return next('You are not logged in! Please log in to get access.');
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next('The user belonging to this token does no longer exist.');
        }

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        // console.log(currentUser);
        if (!currentUser) {
            return next('The user belonging to this token does no longer exist.');
        }


        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error,
        });
    }

}

exports.restrictTo = (...isAdmin) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        console.log(isAdmin);
        console.log(req.user.isAdmin);
        if (!(req.user.isAdmin)) {
            return next('You do not have permission to perform this action');
        }

        next();
    };
};

// exports.forgotPassword = async (req, res, next) => {
//     try {

//         // 1) Get user based on POSTed email
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return next('There is no user with email address.');
//         }

//         // 2) Generate the random reset token
//         const resetToken = user.createPasswordResetToken();
//         await user.save({ validateBeforeSave: false });

//         // 3) Send it to user's email
//         const resetURL = `${req.protocol}://${req.get(
//             'host'
//         )}/api/v1/users/resetPassword/${resetToken}`;
//         console.log(resetToken);

//         const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//         try {
//             await sendEmail({
//                 email: user.email,
//                 subject: 'Your password reset token (valid for 10 min)',
//                 message
//             });
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Token sent to email!'
//             });
//         } catch (err) {
//             console.log(err);
//             user.passwordResetToken = undefined;
//             user.passwordResetExpires = undefined;
//             await user.save({ validateBeforeSave: false });

//             return next('There was an error sending the email. Try again later!');
//         }



//     } catch (error) {
//         res.status(400).json({
//             status: 'error',
//             message: error,
//         });
//     }
// }

// exports.resetPassword = async (req, res, next) => {
//     try {

//         // 1) Get user based on the token
//         const hashedToken = crypto
//             .createHash('sha256')
//             .update(req.params.token)
//             .digest('hex');

//         const user = await User.findOne({
//             passwordResetToken: hashedToken,
//             passwordResetExpires: { $gt: Date.now() }
//         });

//         // 2) If token has not expired, and there is user, set the new password
//         if (!user) {
//             return next('Token is invalid or has expired');
//         }
//         user.password = req.body.password;
//         user.passwordConfirm = req.body.passwordConfirm;
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save();

//         // // 3) Update changedPasswordAt property for the user
//         // // 4) Log the user in, send JWT
//         createSendToken(user, 200, res);


//     } catch (error) {
//         res.status(400).json({
//             status: 'error',
//             message: error,
//         });
//     }
// }

// exports.updatePassword = async (req, res, next) => {
//     try {
//         // 1) Get user from collection
//         const user = await User.findById(req.user.id).select('+password');

//         // // 2) Check if POSTed current password is correct
//         if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//             return next('Your current password is wrong.');
//         }

//         // 3) If so, update password
//         user.password = req.body.password;
//         user.passwordConfirm = req.body.passwordConfirm;
//         await user.save();
//         // User.findByIdAndUpdate will NOT work as intended!

//         // // 4) Log user in, send JWT
//         createSendToken(user, 200, res);

        

//     } catch (error) {
//         res.status(400).json({
//             status: 'error',
//             message: error,
//         });
//     }
// }

exports.isLoggedIn = async (req, res, next) => {

    if (req.cookies.jwt){

        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt, 
                process.env.JWT_SECRET
            );
            // 3) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            
            // GRANT ACCESS TO PROTECTED ROUTE
            res.locals.user = currentUser;
            
            
            return next();

        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: 'error',
                message: error,
            });
        }

        
    }
    next();
    

}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json('success');
    } catch (err) {
        console.log(err);
    }

    
};
