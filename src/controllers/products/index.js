const { product } = require('../../models')
const APPRes = require('../../helpers/response')

module.exports = async (req, res) => {
  try {
    let { limit, page } = defaultValue(req.query.limit, req.query.page)

    let offset = page * limit - limit
    if (offset < 0) {
      offset = 0
    }
    const products = await product.findAll({ limit: parseInt(limit), offset: offset })
    const countItems = await product.count()
    const proxPage = hasProxPage(limit, page, countItems)

    const response = {
      quantityTotal: countItems,
      quantityItems: products.length,
      proxPage: proxPage,
      page: page,
      data: products,
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(APPRes.error(error.message))
  }
}

function defaultValue(limit, page) {
  limit = limit ? parseInt(limit) : 10
  page = page ? parseInt(page) : 1

  if (limit > 200) throw Error('Max quantity for page is 200 items')
  return { limit, page }
}

function hasProxPage(limit, page, countItems) {
  return limit * page < countItems ? true : false
}
