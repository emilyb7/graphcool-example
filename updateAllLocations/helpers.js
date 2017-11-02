export const createLocationWithApi = api => data => {
  const { name, coordinates: [ lat, lng, ], } = data

  const query = require('fs').readFileSync(
    require('path').join(__dirname, 'createLocationMutation.graphql'),
    'utf8'
  )

  const vars = { name, lat, lng, }

  return new Promise((resolve, reject) => {
    api
      .request(query, vars)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
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

export const parseData = data => ({
  id: data.id,
  name: data.Name,
  description: data.Description,
  rating: data.Rating,
  link: data.Link,
  coordinates: getCoordinates(data.Link),
})
