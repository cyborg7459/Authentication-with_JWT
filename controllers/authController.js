exports.signup_get = (req,res) => {
    res.render('signup');
}

exports.signup_post = (req,res) => {
    res.send('New Signup');
}

exports.login_get = (req,res) => {
    res.render('login');
}

exports.login_post = (req,res) => {
    res.send('New login');
}

