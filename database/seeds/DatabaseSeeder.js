'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')
const Drive = use('Drive')
const Helpers = use('Helpers')
const { join } = use('path')

const restaurantsData = require('../fixtures/restaurants')
const usersData = require('../fixtures/users')

class DatabaseSeeder {
  getRandomUser (users) {
    return users[Math.ceil(Math.random() * users.length) - 1]
  }

  async run () {
    /**
     * Create multiple users to start
     */
    const users = await Promise.all(usersData.map((user) => User.create(user)))

    /**
     * Add restaurants and randomly set one of the available user as the
     * restaurant submitter
     */
    const restaurants = await Promise.all(restaurantsData.map((restaurant) => {
      return this.getRandomUser(users).restaurants().create(restaurant)
    }))

    /**
     * Add first 2 users as the visitors to all the restaurants
     */
    await Promise.all(restaurants.map((restaurant) => restaurant.visitors().attach([users[0].id, users[1].id])))
    await Drive.copy(join(__dirname, '../fixtures/images'), Helpers.tmpPath('uploads'))
  }
}

module.exports = DatabaseSeeder
