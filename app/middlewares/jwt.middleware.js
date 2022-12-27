const isAuth = async function (req, res, next) {
    var jwt = require('../helper/auth.helper');
    var authorizationHeader = req.headers.authorization;
    // console.log('authorizationHeader', authorizationHeader);
    const _token = authorizationHeader?.split(' ')[1];
    if (_token) {
        // console.log('123');
        try {
            var authData = await jwt.checkToken(_token);
            // console.log('au', authData);
            req.auth = authData;
            next();
        } catch (error) {
            // console.log(error);
            return res.send({ result: false, msg: 'Invalid token or token expired' });
        }
    } else {
        return res.send({ result: false, msg: 'Token does not exist' });
    }
};

module.exports = {
    isAuth: isAuth,
};
