const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/user');

// register new user route 
router.post('/register', (req, res) => {
    // check if passwords sent in request are matching 
    if (req.body.password !== req.body.passwordConfirm) {
        res.status(400).json({
            success: false,
            msg: 'Passwords do not match.'
        });
        return;
    }

    // initialize new user 
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // save new user to db 
    newUser.save((err) => {
        //check for error
        if (err) {
            // check for multiple errors 
            if (err.errors) {
                //check name errors 
                if (err.errors.name) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.name.message
                    });
                    return;
                } // name error

                //check email errors 
                if (err.errors.email) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.email.message
                    });
                    return;
                } // email error 

                // check username errors
                if (err.errors.username) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.email.username
                    });
                    return;
                } // username errors

                // check password errors 
                if (err.errors.password) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.password.message
                    });
                    return;
                } // password errors

                // Show failed if all else fails for some reasons
                res.status(400).json({
                    success: false,
                    msg: 'Failed to register.'
                });

            } // errors
        } // err

        // if no errors save the user 
        else {
            res.json({
                success: true,
                msg: 'User successfully registered.'
            });
        }
    }); // save

}) // post register

// login existing user route
