const User = require('../models/user');

const handleError = (err) => {
    console.log(err.code);
    let errors = {
        email : '',
        password : ''
    };
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

exports.signup_get = (req,res) => {
    res.render('signup');
}

exports.signup_post = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.create({
            email,
            password
        });
        res.status(201).json({
            status: 'success',
            user
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
    res.send('New login');
}

