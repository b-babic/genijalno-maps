const mongoose = require('mongoose');
const titlize = require('mongoose-title-case');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/db');

// validate user name
const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
]

// validate user email 
const emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isEmail',
        message: 'Email must be valid.'
    })
];

// validate username 
const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 15],
        message: 'Username must be between {ARGS[0]} and {ARGS[1]} characters.'
    }),
    validate({
        validator: 'matches',
        arguments: /^[A-Za-z][-_A-Za-z0-9]+$/,
        message: 'Username must start with a letter and must not have special characters except - and _.'
    })
];

// validate password 
const passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [6, 20],
        message: 'Password must be between {ARGS[0]} and {ARGS[1]} characters.'
    })
];

// gen user schema 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: nameValidator
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: emailValidator
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: passwordValidator
    }
})

// use unique validator package 
UserSchema.plugin(unique, {
    message: 'That {PATH} is already taken.'
});
// make name capitalization consistent
UserSchema.plugin(titlize, {
    paths: ['name'],
    trim: false
});

// finally encrypt user's pw before saving to db
UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (error, hash) => {
            if (error) {
                return next(error);
            }

            user.password = hash;
            next();
        });
    });
});


// export user model
const User = module.exports = mongoose.model('user', UserSchema);
