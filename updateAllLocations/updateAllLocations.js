import { fromEvent, } from 'graphcool-lib'

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
    // delete old data
    const allLocationData = await queryFromFile(api, 'getAllLocations', {})
    const deleteLocationFn = deleteLocationWithApi(api)
    const deletePromises = allLocationData.allLocations.map(deleteLocationFn)
    await Promise.all(deletePromises)

    // get data from spreadsheet
    const spreadsheetData = await fetchNewData()

    // populate database
    const promises = spreadsheetData.map(parseData).map(createLocationFn)
    const results = await Promise.all(promises)

    // send response back to client
    return { data: { count: results.length, }, }

    // handle errors
  } catch (err) {
    console.log('err getting / deleting locations', err)
    return { error: err, }
  }
}
