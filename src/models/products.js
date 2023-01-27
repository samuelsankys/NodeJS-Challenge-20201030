'use strict'

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      code: Sequelize.INTEGER,
      status: Sequelize.ENUM('draft', 'trash', 'published'),
      imported_t: Sequelize.DATE,
      url: Sequelize.STRING,
      creator: Sequelize.STRING,
      created_t: Sequelize.DATE,
      last_modified_t: Sequelize.DATE,
      product_name: Sequelize.STRING,
      quantity: Sequelize.STRING,
      brands: Sequelize.STRING,
      categories: Sequelize.STRING,
      labels: Sequelize.STRING,
      cities: Sequelize.STRING,
      purchase_places: Sequelize.STRING,
      stores: Sequelize.STRING,
      ingredients_text: Sequelize.STRING,
      traces: Sequelize.STRING,
      serving_size: Sequelize.STRING,
      serving_quantity: Sequelize.DOUBLE,
      nutriscore_score: Sequelize.INTEGER,
      nutriscore_grade: Sequelize.STRING,
      main_category: Sequelize.STRING,
      image_url: Sequelize.STRING,
    },
    {
      timestamps: false,
    },
  )

  return Product
}
