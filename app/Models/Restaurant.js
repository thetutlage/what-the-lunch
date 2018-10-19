'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Antl = use('Antl')
const Drive = use('Drive')

class Restaurant extends Model {
  /**
   * A restaurant is always have a submitter
   */
  submitter () {
    return this.belongsTo('App/Models/User', 'submitter_id', 'id')
  }

  /**
   * Related visitors for the restaurant
   */
  visitors () {
    return this.belongsToMany('App/Models/User')
  }

  /**
   * Getter to format the cents back to EURO's. This is called
   * when we convert model instance to it's JSON representation.
   */
  getMinPrice (price) {
    return Antl.formatAmount(price / 100, 'EUR')
  }

  /**
   * Getter to format the cents back to EURO's. This is called
   * when we convert model instance to it's JSON representation.
   */
  getMaxPrice (price) {
    return Antl.formatAmount(price / 100, 'EUR')
  }

  static boot () {
    super.boot()

    /**
     * After the restaurant is updated make sure to remove the
     * original cover image
     */
    this.addHook('afterUpdate', async function (restaurant) {
      if (restaurant.dirty.cover_image) {
        await Drive.delete(`uploads/${restaurant.$originalAttributes.cover_image}`)
      }
    })

    /**
     * After the restaurant is deleted make sure to remove the
     * original cover image
     */
    this.addHook('afterDelete', async function (restaurant) {
      await Drive.delete(`uploads/${restaurant.$originalAttributes.cover_image}`)
    })
  }
}

module.exports = Restaurant
