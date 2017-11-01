import { fromEvent, } from 'graphcool-lib'

export default async event => {
  const init = require('./tabletop')
  const api = fromEvent(event).api('simple/v1')

  const { createLocationWithApi, parseData, } = require('./helpers')
  const createLocation = createLocationWithApi(api)
  // get data from spreadsheet
  try {
    await init()
      .then(data => {
        return data
      })
      .then(async arr => {
        const promises = arr.map(parseData).map(createLocation)
        return await Promise.all(promises)
          .then(res => {
            Promise.resolve()
          })
          .catch(err => {
            Promise.reject(err)
          })
      })
      .catch(err => {
        Promise.reject(err)
      })
    return { data: { name: event.data.name, }, }
  } catch (err) {
    console.log('err', err)
    return { error: 'error in resolver ' + err, }
  }

  // delete old data

  // populate database DONE

  // return success message
}
