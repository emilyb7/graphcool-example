const Joi = require('joi')

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
  name: data.Name,
  coordinates: getCoordinates(data.Link),
})

const validateItem = item => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Link: Joi.string()
      .regex(/@-?[\d.]+,-?[\d.]+/)
      .required(),
  }).pattern(/\w+/, Joi.string().allow(''))

  return Joi.validate(item, schema).error
}

export const validateAll = data => {
  let validData = []
  let errors = []

  data.forEach(item => {
    let error = validateItem(item)
    if (error) {
      errors.push(JSON.stringify(item) + JSON.stringify(error))
    } else {
      validData.push(parseData(item))
    }
  })

  return { validData, errors, }
}

export const queryFromFile = async (api, query, vars) => {
  const fs = require('fs')
  const path = require('path')
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, 'queries', query + '.graphql'),
      async (err, query) => {
        if (err) {
          reject('error reading file', err)
        }

        try {
          let res = await api.request(query.toString(), vars)
          resolve(res)
        } catch (err) {
          reject('error running query ' + query + err)
        }
      }
    )
  })
}

export const deleteLocationWithApi = api => async location => {
  const { id, } = location

  return new Promise((resolve, reject) => {
    queryFromFile(api, 'deleteLocationById', { id, })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const createLocationWithApi = api => async data => {
  const { name, coordinates: [ lat, lng, ], } = data
  const vars = { name, lat, lng, }

  return new Promise((resolve, reject) => {
    queryFromFile(api, 'createLocationMutation', vars)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
