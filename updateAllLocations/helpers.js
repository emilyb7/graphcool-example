export const createLocationWithApi = api => data => {
  const { name, coordinates: [ lat, lng, ], } = data

  const query = `mutation createLocationMutation($name: String!, $lat: Float, $lng: Float) {
    createLocation(name: $name, lat: $lat, lng: $lng) {
      name, lat, lng
    }
  }`

  const vars = { name, lat, lng, }

  return new Promise((resolve, reject) => {
    api
      .request(query, vars)
      .then(res => {
        console.log('location created - ', name)
        resolve(res)
      })
      .catch(err => {
        console.log('error creating location' + err)
        reject(err)
      })
  })
}

export const getCoordinates = url => {
  const coordsRegex = /@-?[\d.]+,-?[\d.]+/
  const separator = /[@,]/
  return url
    .match(coordsRegex)[0]
    .split(separator)
    .slice(1)
    .map(Number)
}

export const parseData = data => {
  return {
    id: data.id,
    name: data.Name,
    description: data.Description,
    rating: data.Rating,
    link: data.Link,
    coordinates: getCoordinates(data.Link),
  }
}
