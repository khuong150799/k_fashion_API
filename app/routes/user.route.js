const router = require('express').Router();
const userController = require('../controllers/user.controller');

module.exports = (app) => {
    //register
    router.post('/register', userController.register);

    //login
    router.post('/login', userController.login);

    //getall
    router.get('/getall', userController.getall);

    app.use('/api/user', router);
};
