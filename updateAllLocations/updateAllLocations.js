import { fromEvent, } from 'graphcool-lib'

export default async event => {
  const init = require('./tabletop')
  const api = fromEvent(event).api('simple/v1')

  const { createLocationWithApi, parseData, } = require('./helpers')
  const createLocationFn = createLocationWithApi(api)

  try {
    // get data from spreadsheet
    const spreadsheetData = await init()

    // populate database
    const promises = spreadsheetData.map(parseData).map(createLocationFn)
    const results = await Promise.all(promises)
    const count = results.length

    return { data: { count, }, }
  } catch (err) {
    console.log('err', err)
    return { error: 'error in resolver ' + err, }
  }

  // delete old data

  // return success message
}
