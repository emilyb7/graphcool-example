const Tabletop = require('tabletop')

module.exports = () => {
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
