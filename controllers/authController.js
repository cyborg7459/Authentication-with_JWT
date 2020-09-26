const User = require('../models/user');
const jwt = require('jsonwebtoken');


const handleError = (err) => {
    console.log(err.message);
    let errors = {
        email : '',
        password : ''
    };

    if(err.message === 'Incorrect email') {
        errors.email = "Email is not registered";
    }
    if(err.message === 'Incorrect password') {
        errors.password = "Incorrect password";
    }
    if(err.code === 11000) {
        errors.email = 'Entered email is already registered';
        return errors;
    }
    else if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.path] = error.message;
        });
    }
    return errors;
}

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    });
}

exports.signup_get = (req,res) => {
    res.render('signup');
}

exports.signup_post = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly : true, maxAge: maxAge*1000});
        res.status(201).json({
            status: 'success',
            user: user._id
        });
    }
    catch(err) {
        const errors = handleError(err);
        res.status(400).json({
            status: 'failure',
            errors
        });
    }
}

exports.login_get = (req,res) => {
    res.render('login');
}

exports.login_post = async (req,res) => {
    const { email,password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
        res.status(200).json({
            user: user._id
        })
    }
    catch(err) {
        const errors = handleError(err);
        res.status(400).json({
            errors
        });
    }
}

exports.logout = (req,res) => {
    res.cookie('jwt', " ", {maxAge: 10});
    res.redirect('/');
}