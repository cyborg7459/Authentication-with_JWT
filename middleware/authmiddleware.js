const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'Chaos isnt a pit chaos is a laddah', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

module.exports = requireAuth;