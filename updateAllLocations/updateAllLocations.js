import { fromEvent, } from 'graphcool-lib'

const Tabletop = require('tabletop')

const init = () => {
  return new Promise((resolve, reject) => {
    Tabletop.init({
      key:
        'docs.google.com/spreadsheets/d/1gcvnL7wEEnEFPeKngb5Magw1sZfKg4bhr_aBI9F-SUU/edit?usp=sharing',
      callback: function(data) {
        try {
          resolve(data)
        } catch (err) {
          reject(err)
        }
      },
      simpleSheet: true,
    })
  })
}

const getCoordinates = url => {
  const coordsRegex = /@-?[\d.]+,-?[\d.]+/
  const separator = /[@,]/
  return url
    .match(coordsRegex)[0]
    .split(separator)
    .slice(1)
    .map(Number)
}

const parseData = data => {
  return {
    id: data.id,
    name: data.Name,
    description: data.Description,
    rating: data.Rating,
    link: data.Link,
    coordinates: getCoordinates(data.Link),
  }
}

const createLocation = async (event, data) => {
  const dataParsed = parseData(data)

  const { name, coordinates: [ lat, lng, ], } = dataParsed

  const query = `mutation createLocationMutation($name: String!, $lat: Float, $lng: Float) {
    createLocation(name: $name, lat: $lat, lng: $lng) {
      name, lat, lng
    }
  }`

  const vars = { name, lat, lng, }

  return new Promise((resolve, reject) => {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')
    api
      .request(query, vars)
      .then(res => {
        console.log('location created - ', name)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default async event => {
  // get data from spreadsheet
  await init()
    .then(data => {
      console.log('got the data')
      return data
    })
    .then(async arr => {
      const promises = await arr.map(createLocation)
      return await Promise.all(promises)
        .then(res => console.log('all promises done'))
        .catch(err => console.log('error in promise.all'))
    })
    .then(done => {
      return { data: { name: event.data.name, }, }
    })
    .catch(err => {
      console.log('err', err)
      return { error: 'error in resolver ' + err, }
    })

  console.log('at the end!')

  // delete old data

  // populate database

  // return success message
}
