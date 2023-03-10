'use strict';
const { body } = require('express-validator');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            fullname: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.TINYINT(1),
            email: DataTypes.STRING,
            active: DataTypes.TINYINT(1),
        },
        {
            sequelize,
            modelName: 'User',
        },
    );

    return User;
};

// exports.register = (body) => {
//     console.log('body');
//     return 1323;
// };
