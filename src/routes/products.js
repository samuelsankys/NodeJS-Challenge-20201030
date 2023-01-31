const update = require('../controllers/products/update')
const get = require('../controllers/products/get')
const index = require('../controllers/products/index')
const remove = require('../controllers/products/delete')

const express = require('express')
const router = express.Router()

router.get('/:code', get)
router.get('/', index)
router.put('/:code', update)
router.delete('/:code', remove)

module.exports = router
