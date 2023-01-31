const { product } = require('../../models')
const APPRes = require('../../helpers/response')

module.exports = async (req, res) => {
  try {
    const { code } = req.params
    const products = await product.findOne({ where: { code } })

    res.status(200).json({ data: products })
  } catch (error) {
    console.log(error)
    return res.status(500).json(APPRes.error(error.message))
  }
}
