'use strict';
const fs = require("fs");

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
    let dataGenre = JSON.parse(fs.readFileSync("./data/genre.json", "utf-8")).map(
      (item) => {
        item.createdAt = new Date();
        item.updatedAt = new Date();
        return item;
      }
    );
    await queryInterface.bulkInsert("Genres", dataGenre);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genres", null, {});

  }
};
