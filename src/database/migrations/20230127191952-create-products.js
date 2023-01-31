'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      code: Sequelize.STRING,
      status: Sequelize.ENUM('draft', 'trash', 'published'),
      imported_t: Sequelize.DATE,
      url: Sequelize.TEXT,
      creator: Sequelize.STRING,
      created_t: Sequelize.STRING,
      last_modified_t: Sequelize.STRING,
      product_name: Sequelize.STRING,
      quantity: Sequelize.STRING,
      brands: Sequelize.STRING,
      categories: Sequelize.TEXT,
      labels: Sequelize.STRING,
      cities: Sequelize.STRING,
      purchase_places: Sequelize.STRING,
      stores: Sequelize.STRING,
      ingredients_text: Sequelize.TEXT,
      traces: Sequelize.STRING,
      serving_size: Sequelize.STRING,
      serving_quantity: Sequelize.STRING,
      nutriscore_score: Sequelize.STRING,
      nutriscore_grade: Sequelize.STRING,
      main_category: Sequelize.STRING,
      image_url: Sequelize.STRING,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products')
  },
}
