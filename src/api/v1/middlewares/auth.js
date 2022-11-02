const jwt = require('jsonwebtoken');

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

module.exports = {
    authenticateToken,
    generateAccessToken,
};
