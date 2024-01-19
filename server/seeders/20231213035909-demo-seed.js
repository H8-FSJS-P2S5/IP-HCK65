'use strict';
const fs = require('fs');
const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let dataUser = require('../data/users.json')
   dataUser.map((e) => {
    delete e.id
    e.password = hashPass(e.password)
    e.createdAt = new Date()
    e.updatedAt = new Date()

    return e
   });

   let dataCategory = require('../data/categories.json')
   dataCategory.map((e) => {
    delete e.id
    e.createdAt = new Date()
    e.updatedAt = new Date()

    return e
   });

   let dataItem = require('../data/items.json')
   dataItem.map((e) => {
    delete e.id
    e.createdAt = new Date()
    e.updatedAt = new Date()

    return e
   });

   await queryInterface.bulkInsert('Users', dataUser, {})
   await queryInterface.bulkInsert('Categories', dataCategory, {})
   await queryInterface.bulkInsert('Items', dataItem, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Items', null, {})
  }
};
