const User = require('../models/User');
const auth = require('../middlewares/auth');
const argon2 = require('argon2');

// USER LOGIN FUNCTION
const login = async ({ email, password }, callback) => {
    console.log(email, password);
    const user = await User.findOne({ email });
    if (user != null) {
        const comparepwd = await argon2.verify(user.password, password);
        if (comparepwd) {
            const { accessToken, refreshToken } = await auth.generateTokens(
                email
            );
            return callback(null, {
                ...user.toJSON(),
                accessToken,
                refreshToken,
            });
        } else {
            return callback({
                message: 'Invalid Username or Password',
            });
        }
    } else {
        return callback({
            message: 'Invalid Username or Password',
        });
    }
};

// USER REGISTER FUNCTION
const register = async (params, callback) => {
    const { password } = params;
    const hashedPassword = await argon2.hash(password);
    if (params.username == undefined)
        return callback({ message: 'Username is required' });

    const user = new User(params);
    user.password = hashedPassword;
    user.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

// EXPORT FUNCTIONS
module.exports = {
    login,
    register,
};
