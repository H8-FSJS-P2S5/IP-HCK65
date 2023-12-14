'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Campaigns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            total_fundraising: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            image_1: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image_2: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image_3: {
                allowNull: false,
                type: Sequelize.STRING
            },
            remaining_balance: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Campaigns');
    }
};