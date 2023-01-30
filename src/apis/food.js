const axios = require('axios')
const zlib = require('zlib')
const { Transform } = require('stream')
const JSONStream = require('JSONStream')
const urlBase = 'https://challenges.coode.sh/food/data/json/'

exports.listFile = async () => {
  try {
    const response = await axios.get(urlBase + 'index.txt')
    return response.data.trim().split('\n')
  } catch (error) {
    throw error
  }
}

exports.listProducts = async (file, start, quantity) => {
  const httpStream = await getStream(file)
  const jsonResponse = await readFile(httpStream, start, quantity)
  return selectJsonKeys(jsonResponse)
}

const getStream = async (fileName) => {
  try {
    const response = await axios.get(urlBase + fileName, {
      headers: {
        'accept-encoding': 'gzip',
      },
      responseType: 'stream',
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const readFile = async (file, start, quantity) => {
  try {
    const transform = transformStream()
    const jsonReadStream = file
      .pipe(zlib.createGunzip())
      .pipe(transform)
      .pipe(JSONStream.parse({ emitKey: true }))

    const result = []
    return new Promise((resolve, reject) => {
      let count = 0
      jsonReadStream.on('data', (chunk) => {
        if (count >= start && count < start + quantity) {
          result.push(chunk)
        }
        if (count == start + quantity) {
          jsonReadStream.destroy()
          resolve(result)
        }
        count++
      })
      jsonReadStream.on('end', () => {
        resolve(result)
      })
      jsonReadStream.on('error', (error) => {
        reject(error)
      })
    })
  } catch (error) {
    throw error
  }
}

const selectJsonKeys = async (data) => {
  const imported_t = new Date()
  const status = 'published'
  return data.map((e) => {
    return {
      code: e.code,
      status: status,
      imported_t: imported_t,
      url: e.url,
      creator: e.creator,
      created_t: e.created_t,
      last_modified_t: e.last_modified_t,
      product_name: e.product_name,
      quantity: e.quantity,
      brands: e.brands,
      categories: e.categories,
      labels: e.labels,
      cities: e.cities,
      purchase_places: e.purchase_places,
      stores: e.stores,
      ingredients_text: e.ingredients_text,
      traces: e.traces,
      serving_size: e.serving_size,
      serving_quantity: e.serving_quantity,
      nutriscore_score: e.nutriscore_score,
      nutriscore_grade: e.nutriscore_grade,
      main_category: e.main_category,
      image_url: e.image_url,
    }
  })
}

const transformStream = () => {
  const transform = new Transform({
    transform: (chunk, encoding, next) => {
      next(null, chunk)
    },
  })
  return transform
}
