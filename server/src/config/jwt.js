require('dotenv').config();

const jwtConfig = {
    secret:process.env.JWT_SECRET,
    expiresIn:'20s',
}

module.exports = jwtConfig;