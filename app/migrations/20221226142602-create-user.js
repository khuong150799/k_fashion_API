'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl_Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullnam: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.TINYINT(1),
            },
            email: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.TINYINT(1),
            },
            created_at: {
                allowNull: true,
                type: Sequelize.BIGINT,
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.BIGINT,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tbl_Users');
    },
};
