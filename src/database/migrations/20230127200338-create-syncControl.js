'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sync_control', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: Sequelize.STRING,
      last_sync_product: Sequelize.STRING,
      imported_t: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sync_control')
  },
}
