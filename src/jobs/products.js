const cron = require('node-cron')
const { product, sync_control, sequelize } = require('../models')
const apiFood = require('../apis/food')

const MAX_IMPORT_QUANTITY = 100
const jobsProducts = async () => {
  firstSinc()
  cron.schedule('0 3 * * *', async () => {
    console.log('Run cron')
    syncProducts()
  })
}

async function firstSinc() {
  const count = await product.count()
  if (!count) {
    syncProducts()
  }
}

async function syncProducts() {
  try {
    const files = await apiFood.listFile()
    let sequenceCron = await lastSequenceSync()

    for (let file of files) {
      const lastSync = await positionLastSync(file)
      const startPosition = lastSync == null ? 0 : lastSync
      const products = await parcialProducts(startPosition, MAX_IMPORT_QUANTITY, file)
      if (!products) return

      const payloadStartSync = {
        file: file,
        last_sync_product: parseInt(products.length) + parseInt(startPosition),
        sequence_cron: sequenceCron + 1,
        start_imported_t: new Date().getTime(),
      }

      const startSyncControl = await insertSyncControl(payloadStartSync)
      await insertListProducts(products)
      const payloadEndSync = {
        end_imported_t: new Date().getTime(),
      }

      await updateSyncControl(startSyncControl.id, payloadEndSync)
    }
  } catch (error) {
    console.log(`Erro ao executar ============== ${error}`)
  }
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

async function lastSequenceSync() {
  const response = await sync_control.findOne({
    attributes: [[sequelize.fn('MAX', sequelize.col('sequence_cron')), 'sequence_cron']],
  })
  return response.sequence_cron
}

async function parcialProducts(start, quantity, file) {
  const products = await apiFood.listProducts(file, start, quantity)
  return products
}

async function insertListProducts(products) {
  return await sequelize.transaction(async (t) => {
    const promises = products.map(async (product) => {
      return await insertProduct(product, t)
    })

    return await Promise.all(promises)
      .then((res) => {
        console.log(res.length)
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
  return await sync_control.create(data)
}

async function updateSyncControl(id, data) {
  return await sync_control.update(data, { where: { id } })
}

module.exports = { jobsProducts }
