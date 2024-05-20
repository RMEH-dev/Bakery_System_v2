const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');

const authenticationToken = (req, res, next) => {
    const token =req.headers['authorization'];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) return res,sendStatus(403);
        req.user=user;
        next();
    });
};

module.exports = authenticationToken;