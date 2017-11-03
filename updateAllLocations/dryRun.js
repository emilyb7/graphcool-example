const fetchNewData = require('./tabletop')
const Joi = require('joi')

const validateItem = item => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Link: Joi.string()
      .regex(/@-?[\d.]+,-?[\d.]+/)
      .required(),
  }).pattern(/\w+/, Joi.string().allow(''))

  return Joi.validate(item, schema).error
}

const validateAll = data => {
  let validData = []
  let errors = []

  data.forEach(item => {
    if (validateItem(item)) {
      errors.push(item)
    } else {
      validData.push(item)
    }
  })

  return { errors, }
}

const dryRun = async () => {
  let data = await fetchNewData()
  let selection = data.slice(0)
  console.log(validateAll(selection))
}

dryRun()
