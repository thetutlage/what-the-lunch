'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.integer('submitter_id').notNullable().unsigned()
      table.string('name', 254).notNullable()
      table.string('address', 254).notNullable()
      table.string('url', 254)
      table.string('cover_image', 254).notNullable()
      table.integer('min_price', 11).notNullable()
      table.integer('max_price', 11).notNullable()
      table.string('opens_at', 20).notNullable()
      table.string('closes_at', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
