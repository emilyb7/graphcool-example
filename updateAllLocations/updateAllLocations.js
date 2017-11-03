import { fromEvent, } from 'graphcool-lib'

export default async event => {
  const fetchNewData = require('./tabletop')
  const {
    createLocationWithApi,
    deleteLocationWithApi,
    queryFromFile,
    validateAll,
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
    const createPromises = validData.map(createLocationFn)

    // add the new data, delete the old data
    await Promise.all([ ...createPromises, ...deletePromises, ])

    // send response back to client
    return { data: { count: createPromises.length, errors: errors, }, }

    // handle errors
  } catch (err) {
    console.log('err getting / deleting locations', err)
    return { error: err, }
  }
}
