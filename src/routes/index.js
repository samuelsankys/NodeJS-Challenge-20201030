const products = require('./products')
const index = require('../controllers/index')

module.exports = (app) => {
  app.use('/products', products)
  app.get('/', index)
}
