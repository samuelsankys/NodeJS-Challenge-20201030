const { product } = require('../../models')
const APPRes = require('../../helpers/response')

module.exports = async (req, res) => {
  try {
    const { code } = req.params

    const data = {
      status: 'trash',
      last_modified_t: new Date().getTime(),
    }
    await product.update(data, { where: { code } })

    res.status(200).json({ deleted: 'ok' })
  } catch (error) {
    console.log(error)
    return res.status(500).json(APPRes.error(error.message))
  }
}
