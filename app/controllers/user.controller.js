const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constantNotify = require('../config/constants');

exports.register = async (req, res) => {
    try {
        const { fullname, password, gender, email, active } = req.body;

        const hash = bcrypt.hashSync(password, 12);
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: { fullname, password: hash, gender, email, active },
        });
        // console.log('response[0]', );
        // console.log('response[1]', response[1]);
        if (response[1]) {
            const accessToken = jwt.sign({ id: response[0].id, email }, constantNotify.ACCESS_TOKEN, {
                expiresIn: '1d',
            });
            const refreshToken = jwt.sign({ id: response[0].id, email }, constantNotify.REFRESH_TOKEN, {
                expiresIn: '30d',
            });
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            return res.send({ result: true, data: [{ msg: 'Đăng kí thành công', newData: response[0], accessToken }] });
        } else {
            return res.send({ result: false, errors: [{ msg: 'Email đã tồn tại' }] });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            errors: [
                {
                    msg: 'ADD_DATA_FAILED',
                },
            ],
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, active } = req.body;
        const user = await db.User.findOne({ where: { email } });
        // console.log(user?.password);
        if (!user) {
            return res.send({ result: false, errors: [{ msg: 'Email không tồn tại' }] });
        }
        // console.log(password);
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.send({ result: false, errors: [{ msg: 'Mật khẩu không tồn tại' }] });
        }
        const accessToken = jwt.sign({ id: user.id, email: user.email }, constantNotify.ACCESS_TOKEN, {
            expiresIn: '1d',
        });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, constantNotify.REFRESH_TOKEN, {
            expiresIn: '30d',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });

        return res.send({ result: true, data: [{ id: user.id, accessToken }] });
    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            errors: [
                {
                    msg: 'ADD_DATA_FAILED',
                },
            ],
        });
    }
};
exports.getall = async (req, res) => {
    try {
        const response = await db.User.findAll({});
        // console.log(response);
        res.send({ result: true, data: response });
    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            errors: [
                {
                    msg: 'ADD_DATA_FAILED',
                },
            ],
        });
    }
};
