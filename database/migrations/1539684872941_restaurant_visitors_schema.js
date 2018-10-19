'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantVisitorsSchema extends Schema {
  up () {
    this.create('restaurant_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNull()
      table.integer('restaurant_id').unsigned().notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurant_user')
  }
}

module.exports = RestaurantVisitorsSchema
