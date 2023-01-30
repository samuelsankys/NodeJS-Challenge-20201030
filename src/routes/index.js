const products = require('./products')

module.exports = (app) => {
  app.use('/products', products)
}
