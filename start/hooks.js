const { hooks } = require('@adonisjs/ignitor')

hooks.before.httpServer(() => {
  const View = use('View')
  const Config = use('Config')
  const Validator = use('Validator')

  /**
   * Add `findBy` global. The method is an alias of `find` array
   * method but takes the key vs the callback
   */
  View.global('findBy', function (collection, keyName, value) {
    return collection.find((item) => item[keyName] === value)
  })

  /**
   * Extend sanitizor with `toCents` sanitization to convert human
   * friendly amount to cents
   */
  Validator.sanitizor.toCents = function (value) {
    const nonCurr = value.replace(/[^\d\.\,\s]+/, '').trim()
    return nonCurr ? parseFloat(nonCurr).toFixed(2) * 100 : ''
  }
})
