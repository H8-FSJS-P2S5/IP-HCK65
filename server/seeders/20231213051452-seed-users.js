'use strict';

const {generatePassword} = require("../helpers");
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
            // let users = require('../')

            // await queryInterface.bulkInsert('People', [{
            //   name: 'John Doe',
            //   isBetaMember: false
            // }], {});

        let users = require('../data/users.json').map(item => {
                item.password = generatePassword(item.password)
                item.createdAt = new Date()
                item.updatedAt = new Date()
                return item
            })
        await queryInterface.bulkInsert('Users', users);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};
