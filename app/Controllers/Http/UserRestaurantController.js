'use strict'

class UserRestaurantController {
  async index ({ view, auth }) {
    const restaurants = await auth.user.restaurants().fetch()
    return view.render('restaurants.userList', { restaurants: restaurants.toJSON() })
  }
}

module.exports = UserRestaurantController
