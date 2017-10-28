import { fromEvent, } from 'graphcool-lib'

export default async event => {
  const { name, mapsLink, } = event.data

  const [ lat, lng, ] = mapsLink
    .match(/@[\d.,-]+/)[0]
    .split(/[@,]/g)
    .slice(1, 3)
    .map(Number)
  // you can use ES7 with async/await and even TypeScript in your functions :)
  const query = `mutation createLocationMutation($name: String!, $lat: Float, $lng: Float) {
    createLocation(name: $name, lat: $lat, lng: $lng) {
      name, lat, lng
    }
  }`

  const vars = { name, lat, lng, }

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    let results = await new Promise((resolve, reject) => {
      api
        .request(query, vars)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

    return {
      data: results.createLocation,
    }
  } catch (err) {
    console.log('Error in resolver ' + err)
    return { error: 'Error in resolver ' + err, }
  }
}
