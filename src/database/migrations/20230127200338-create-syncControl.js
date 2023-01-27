'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sync_control', {
      file: Sequelize.STRING,
      last_sync_product: Sequelize.STRING,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sync_control')
  },
}
