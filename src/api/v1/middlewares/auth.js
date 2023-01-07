const jwt = require('jsonwebtoken');
const Redis = require('../utils/redisConnector');

// TOKEN VERIFYING FUNCTION
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// TOKEN GENERATION FUNCTION
const generateAccessToken = (email) => {
    return jwt.sign({ data: email }, process.env.JWT_SECRETE, {
        expiresIn: '1h',
    });
};

const generateTokens = async (email) => {
    const accessToken = jwt.sign({ data: email }, process.env.JWT_SECRETE, {
        expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
        { data: email },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: '7d',
        }
    );

    // this will create user session
    // user email is stored in redis and refresh token is attached
    await Redis.set(email, refreshToken);

    return { refreshToken, accessToken };
};

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateTokens,
};
