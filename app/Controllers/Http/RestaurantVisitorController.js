'use strict'

const Restaurant = use('App/Models/Restaurant')

class RestaurantVisitorController {
  async store ({ params, auth, response }) {
    const restaurant = await Restaurant.findOrFail(params.id)
    const visitor = await restaurant.visitors().where('user_id', auth.user.id).first()

    /**
     * Add user as a visitor when isn't a visitor already
     */
    if (!visitor) {
      await restaurant.visitors().attach([auth.user.id])
    }

    response.redirect('back')
  }
}

module.exports = RestaurantVisitorController
