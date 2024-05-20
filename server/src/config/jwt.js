require('dotenv').config();

const jwtConfig = {
    secret:process.env.JWT_SECRET,
    expiresIn:'15seconds',
}

module.exports = jwtConfig;