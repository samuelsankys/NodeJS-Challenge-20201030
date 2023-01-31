const { product } = require('../../models')
const APPRes = require('../../helpers/response')
const Joi = require('joi')

module.exports = async (req, res) => {
  try {
    const { code } = req.params
    await analyseData(req.body)

    const data = req.body
    data.last_modified_t = new Date().getTime()

    await product.update(data, { where: { code } })

    const products = await product.findOne({ where: { code } })

    res.status(200).send({ data: products })
  } catch (error) {
    console.log(error)
    return res.status(500).json(APPRes.error(error.message))
  }
}

async function analyseData(request) {
  const schema = Joi.object({
    status: Joi.string().allow('draft', 'trash', 'published').required(),
    url: Joi.string().required(),
    creator: Joi.string().required(),
    product_name: Joi.string().required(),
    quantity: Joi.string().allow('').required(),
    brands: Joi.string().allow('').required(),
    categories: Joi.string().allow('').required(),
    labels: Joi.string().allow('').required(),
    cities: Joi.string().allow('').required(),
    purchase_places: Joi.string().allow('').required(),
    stores: Joi.string().allow('').required(),
    ingredients_text: Joi.string().allow('').required(),
    traces: Joi.string().allow('').required(),
    serving_size: Joi.string().allow('').required(),
    serving_quantity: Joi.string().allow('').required(),
    nutriscore_score: Joi.string().allow('').required(),
    nutriscore_grade: Joi.string().allow('').required(),
    main_category: Joi.string().allow('').required(),
    image_url: Joi.string().required(),
  })

  return await schema.validateAsync(request)
}
