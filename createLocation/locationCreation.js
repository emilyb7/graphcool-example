import { fromEvent, } from 'graphcool-lib'

export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)
  const query = `mutation createLocationMutation {
    createLocation(name: "${event.data.name}") {
      name
    }
  }`

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  let results = await new Promise((resolve, reject) => {
    api
      .request(query)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

  return {
    data: {
      name: results.createLocation.name,
    },
  }
}
