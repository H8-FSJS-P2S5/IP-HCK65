'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('ReadingLists', 'imageUrl', {type : Sequelize.DataTypes.TEXT}, {})
    await queryInterface.addColumn('ReadingLists', 'author', {type : Sequelize.DataTypes.STRING}, {})
    await queryInterface.addColumn('ReadingLists', 'publisher', {type : Sequelize.DataTypes.STRING}, {})
    await queryInterface.addColumn('ReadingLists', 'publisherDate', {type : Sequelize.DataTypes.STRING}, {})
    await queryInterface.addColumn('ReadingLists', 'pages', {type : Sequelize.DataTypes.STRING}, {})
    await queryInterface.addColumn('ReadingLists', 'linkReading', {type : Sequelize.DataTypes.STRING}, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('ReadingLists', 'imageUrl', {})
    await queryInterface.removeColumn('ReadingLists', 'author', {})
    await queryInterface.removeColumn('ReadingLists', 'publisher', {})
    await queryInterface.removeColumn('ReadingLists', 'publisherDate', {})
    await queryInterface.removeColumn('ReadingLists', 'pages', {})
    await queryInterface.removeColumn('ReadingLists', 'linkReading', {})

  }
};
