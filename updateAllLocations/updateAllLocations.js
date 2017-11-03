import { fromEvent, } from 'graphcool-lib'
const Joi = require('joi')

const validateItem = item => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Link: Joi.string()
      .regex(/@-?[\d.]+,-?[\d.]+/)
      .required(),
  }).pattern(/\w+/, Joi.string().allow(''))

  return Joi.validate(item, schema).error
}

const validateAll = data => {
  let validData = []
  let errors = []

  data.forEach(item => {
    let error = validateItem(item)
    if (error) {
      errors.push(JSON.stringify(item) + JSON.stringify(error))
    } else {
      validData.push(item)
    }
  })

  return { validData, errors, }
}

export default async event => {
  const fetchNewData = require('./tabletop')
  const {
    createLocationWithApi,
    deleteLocationWithApi,
    parseData,
    queryFromFile,
  } = require('./helpers')

  const api = fromEvent(event).api('simple/v1')
  const createLocationFn = createLocationWithApi(api)

  try {
    // get ready to delete old data
    const allLocationData = await queryFromFile(api, 'getAllLocations', {})
    const deleteLocationFn = deleteLocationWithApi(api)
    const deletePromises = allLocationData.allLocations.map(deleteLocationFn)

    // get data from spreadsheet
    const spreadsheetData = await fetchNewData()

    // validate
    const { errors, validData, } = validateAll(spreadsheetData)

    // get ready to fill database with new data
    const promises = validData.map(parseData).map(createLocationFn)

    // only delete old data when the rest is done!
    await Promise.all(deletePromises)

    // add the new data
    const results = await Promise.all(promises)

    // send response back to client
    return { data: { count: results.length, errors: errors, }, }

    // handle errors
  } catch (err) {
    console.log('err getting / deleting locations', err)
    return { error: err, }
  }
}
