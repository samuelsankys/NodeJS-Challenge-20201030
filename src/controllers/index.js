const { sequelize } = require('../models/index')
const { sync_control } = require('../models')
const APPRes = require('../helpers/response')
const process = require('process')
const moment = require('moment')

module.exports = async (req, res) => {
  try {
    let connection = ''
    sequelize
      .authenticate()
      .then(() => {
        connection = 'ok'
      })
      .catch(() => {
        connection = 'false'
      })

    const durationLastCron = (await durationLastSync()) + ' s'
    const lastSync = moment(await initCron()).format('DD/MM/YYYY HH:mm:ss')

    const memory = memoryUse()

    const response = { connection, durationLastCron, lastSync, memory }

    res.status(200).json({ data: response })
  } catch (error) {
    console.log(error)
    return res.status(500).send(APPRes.error(error.message))
  }
}

async function durationLastSync() {
  const sync = await lastsSync()
  const last = sync[sync.length - 1].end_imported_t
  const first = sync[0].start_imported_t

  if (last === first) {
    return 0
  }
  const result = last - first
  return result / 1000
}

async function initCron() {
  const sync = await lastsSync()
  return sync[0].start_imported_t
}

function memoryUse() {
  const memory = {}
  for (const [key, value] of Object.entries(process.memoryUsage())) {
    memory[key] = value / 1000000 + ' MB'
  }
  return memory
}

async function lastsSync() {
  const last_sequence_cron = await lastSequenceSync()

  const response = await sync_control.findAll({
    where: {
      sequence_cron: last_sequence_cron,
    },
  })
  return response
}

async function lastSequenceSync() {
  const response = await sync_control.findAll({
    attributes: [[sequelize.fn('MAX', sequelize.col('sequence_cron')), 'sequence_cron']],
  })
  return response[0].sequence_cron
}
