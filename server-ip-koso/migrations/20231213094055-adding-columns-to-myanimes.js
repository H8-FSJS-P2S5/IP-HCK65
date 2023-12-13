"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("MyAnimes", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "titleJap", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "imgUrl", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "episodes", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "status", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "aired", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "synopsis", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("MyAnimes", "producers", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "licensors", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("MyAnimes", "studios", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("MyAnimes", "studios");
    await queryInterface.removeColumn("MyAnimes", "licensors");
    await queryInterface.removeColumn("MyAnimes", "producers");
    await queryInterface.removeColumn("MyAnimes", "synopsis");
    await queryInterface.removeColumn("MyAnimes", "aired");
    await queryInterface.removeColumn("MyAnimes", "status");
    await queryInterface.removeColumn("MyAnimes", "episodes");
    await queryInterface.removeColumn("MyAnimes", "imgUrl");
    await queryInterface.removeColumn("MyAnimes", "titleJap");
    await queryInterface.removeColumn("MyAnimes", "title");
  },
};
