const userService = require('../services/UserServices');

// REGISTER CONTROLLER HANDLER
exports.register = (req, res, next) => {
    userService.register(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: 'User registered successfully',
            data: result,
        });
    });
};

// LOGIN CONTROLLER HANDLER
exports.login = (req, res, next) => {
    const { email, password } = req.body;
    userService.login({ email, password }, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: 'Athentication successfull',
            data: result,
        });
    });
};
