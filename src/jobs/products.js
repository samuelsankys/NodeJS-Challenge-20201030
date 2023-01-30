const cron = require('node-cron')
const { product, sync_control, sequelize } = require('../models')
const apiFood = require('../apis/food')

const MAX_IMPORT_QUANTITY = 100
const jobsProducts = async () => {
  cron.schedule('*/2 * * * *', async () => {
    try {
      console.log('Run cron')
      const files = await apiFood.listFile()

      for (let file of files) {
        const lastSync = await positionLastSync(file)
        const startPosition = lastSync == null ? 0 : lastSync
        const products = await parcialProducts(startPosition, MAX_IMPORT_QUANTITY, file)
        if (!products) return

        const payloadSync = {
          file: file,
          last_sync_product: parseInt(products.length) + parseInt(startPosition),
          imported_t: new Date(),
        }

        const syncControl = await insertSyncControl(payloadSync)
        await insertListProducts(products)
      }
    } catch (error) {
      console.log(`Erro ao executar ============== ${error}`)
    }
  })
}

async function positionLastSync(file) {
  const response = await sync_control.findAll({
    attributes: [[sequelize.fn('MAX', sequelize.col('last_sync_product')), 'last_sync_product']],
    where: {
      file,
    },
  })
  return response[0].last_sync_product
}

async function parcialProducts(start, quantity, file) {
  console.log('parcial1')
  const products = await apiFood.listProducts(file, start, quantity)
  // console.log(products)
  // console.log('parcial1')
  // const end = defineEndProducts(start, quantity, products.length)
  // if (!end) {
  //   return null
  // }
  console.log('parcial')
  return products //.slice(start, end)
}

// const defineEndProducts = (start, quantity, sizeProducts) => {
//   start = parseInt(start)
//   quantity = parseInt(quantity)
//   sizeProducts = parseInt(sizeProducts)
//   if (start === sizeProducts) {
//     return null
//   }
//   if (start + quantity > sizeProducts) {
//     return sizeProducts - start
//   }
//   return start + quantity
// }

async function insertListProducts(products) {
  return await sequelize.transaction(async (t) => {
    const promises = products.map(async (product) => {
      return await insertProduct(product, t)
    })

    return await Promise.all(promises)
      .then((res) => {
        console.log(res)
      })
      .catch(async (error) => {
        console.log(`Erro ao executar ${error}`)
      })
  })
}

async function insertProduct(data, t) {
  return await product.create(data, { transaction: t })
}

async function insertSyncControl(data) {
  return await sync_control.create({
    file: data.file,
    last_sync_product: data.last_sync_product,
    imported_t: data.imported_t,
  })
}

module.exports = { jobsProducts }
