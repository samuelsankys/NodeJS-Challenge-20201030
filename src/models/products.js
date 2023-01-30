'use strict'

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: DataTypes.ENUM('draft', 'trash', 'published'),
      imported_t: DataTypes.DATE,
      url: DataTypes.STRING,
      creator: DataTypes.STRING,
      created_t: DataTypes.STRING,
      last_modified_t: DataTypes.STRING,
      product_name: DataTypes.STRING,
      quantity: DataTypes.STRING,
      brands: DataTypes.STRING,
      categories: DataTypes.STRING,
      labels: DataTypes.STRING,
      cities: DataTypes.STRING,
      purchase_places: DataTypes.STRING,
      stores: DataTypes.STRING,
      ingredients_text: DataTypes.TEXT,
      traces: DataTypes.STRING,
      serving_size: DataTypes.STRING,
      serving_quantity: DataTypes.DOUBLE,
      nutriscore_score: DataTypes.INTEGER,
      nutriscore_grade: DataTypes.STRING,
      main_category: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  )

  return Product
}
