'use strict';

const users = require("../data/users.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */


        let campaigns = require('../data/campaigns.json').map(item => {
            item.createdAt = new Date()
            item.updatedAt = new Date()
            return item
        })
        await queryInterface.bulkInsert('Campaigns', campaigns);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Campaigns', null, {});
    }
};
