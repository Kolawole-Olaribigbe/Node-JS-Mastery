const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Register controller
const registerUser = async (req, res) => {
    try {
        //Extract user information from our request body
        const {username, email, password, role} = req.body;

        //Check if user already exists in database
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if (checkExistingUser) {
            return res.status(400).json({
                success : false,
                message : "Username or Email already exists. Please try again with different username or email"
            });
        }
        //Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user and save in database
        const newlyCreatedUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        });
        await newlyCreatedUser.save();
        if (newlyCreatedUser) {
            res.status(201).json({
                success : true,
                message : 'User registered successfully'
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Unable to register user! Please try again'
            });
        }
    } catch (e) {
        res.status(500).json({
            success : false,
            message : 'Some error occurred! Please try again'
        });
    }
}

// Login controller
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        //Find out if current user exists in database or not
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({
                success : false,
                message : 'User does not exist'
            });
        }
        //If the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success : false,
                message : 'Invalid credentials'
            });
        }
        //Create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '30m'
        });
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken
        });

    } catch (e) {
        res.status(500).json({
            success : false,
            message : "Some error occurred! Please try again"
        });
    }
}
module.exports = {registerUser, loginUser}