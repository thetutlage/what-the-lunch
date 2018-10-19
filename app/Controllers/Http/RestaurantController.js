'use strict'

const Restaurant = use('App/Models/Restaurant')
const Helpers = use('Helpers')

class RestaurantController {
  /**
   * Pull recently created 10 restaurants
  */
  async indexRecent ({ view }) {
    /**
     * Fetch recent 10 restaurants
     */
    const restaurants = await Restaurant
      .query()
      .orderBy('id', 'desc')
      .limit(10)
      .fetch()

    /**
     * Render the home.edge file and pass restaurants JSON representation
     * to it.
     */
    return view.render('home', { restaurants: restaurants.toJSON() })
  }

  /**
   * Paginate through all restaurants
   */
  async index ({ request, view }) {
    /**
     * Get the page query string and cast it to a number
     */
    const page = Number(request.input('page', 1))

    /**
     * Paginate through the restaurants by pulling 10/page.
     */
    const restaurants = await Restaurant
      .query()
      .orderBy('id', 'desc')
      .paginate(page, 10)

    /**
     * Render restaurants/list.edge view and pass along all the restaurants.
     */
    return view.render('restaurants.list', { restaurants: restaurants.toJSON() })
  }

  /**
   * Show form to create a restaurant
   */
  async create ({ view }) {
    /**
     * Render the restaurants/create.edge view. Which presents the
     * form to create the restaurant
     */
    return view.render('restaurants.create')
  }

  /**
   * Handle new restaurant form submission
   */
  async store ({ request, session, response, auth }) {
    /**
     * Cherry pick fields to save inside the database. Always make sure to validate
     * and sanitize data before consuming. We are doing that inside the StoreRestaurant
     * Validator
     */
    const payload = request.only(['name', 'address', 'min_price', 'max_price', 'url', 'opens_at', 'closes_at'])

    const coverImage = request.file('cover_image')

    /**
     * The cover_image inside the database will be the file name, which we can later
     * use to serve the file using a custom route
     */
    payload.cover_image = `${new Date().getTime()}.${coverImage.extname}`

    /**
     * Get instance of `cover_image` file stream and move it to the uploads
     * directory inside the `projectroot/tmp`.
     */
    await coverImage.move(Helpers.tmpPath('uploads'), {
      name: payload.cover_image
    })

    /**
     * Create the restaurant and tie it with the currently loggedin user. For same
     * we use `auth.user.restaurants` relationship vs using `Restaurant Model`
     * directly.
     */
    const restaurant = await auth.user.restaurants().create(payload)

    /**
     * Flash success notification
     */
    session.flash({ notification: 'Restaurant created successfully' })

    /**
     * Redirect the user back
     */
    response.route('RestaurantController.edit', { id: restaurant.id })
  }

  /**
   * Show a single restaurant
   */
  async show ({ params, view }) {
    /**
     * Find the restaurant with the id or fail. The fail case is handled
     * inside the global exception handler.
     */
    const restaurant = await Restaurant.findOrFail(params.id)

    /**
     * Load the related visitors
     */
    await restaurant.load('visitors')

    /**
     * Load the restaurant submitter
     */
    await restaurant.load('submitter')

    /**
     * Render `restaurants/show.edge` view and pass the restaurant json
     * representation.
     */
    return view.render('restaurants.show', { restaurant: restaurant.toJSON() })
  }

  /**
   * Show form to edit the restaurant
   */
  async edit ({ view, params, auth }) {
    /**
     * Find the restaurant with the `id` and was created
     * by the currently logged in user.
     */
    const restaurant = await auth.user.restaurants().where('id', params.id).firstOrFail()

    /**
     * Render the restaurant editing form
     */
    return view.render('restaurants.edit', { restaurant: restaurant.toJSON() })
  }

  /**
   * Handle update restaurant form submission
   */
  async update ({ request, view, params, response, session, auth }) {
    /**
     * Find the restaurant with the `id` and was created
     * by the currently logged in user.
     */
    const restaurant = await auth.user.restaurants().where('id', params.id).firstOrFail()

    /**
     * The data we want to consume for updating the restaurant
     */
    const payload = request.only(['name', 'address', 'min_price', 'max_price', 'url', 'opens_at', 'closes_at'])

    const coverImage = request.file('cover_image')

    /**
     * If new cover image was uploaded, then re-upload it
     */
    if (coverImage) {
      payload.cover_image = `${new Date().getTime()}.${coverImage.extname}`
      await coverImage.move(Helpers.tmpPath('uploads'), {
        name: payload.cover_image
      })
    }

    /**
     * The merge method does all the magic of finding if the values
     * were changed or not
     */
    restaurant.merge(payload)

    /**
     * Finally update the restaurant. The update query is only executed, if
     * something was changed
     */
    await restaurant.save()

    /**
     * Send a flash success message
     */
    session.flash({ notification: 'Restaurant updated successfully' })

    /**
     * Send the user back to the old page
     */
    response.redirect('back')
  }

  async destroy ({ auth, params, response, session }) {
    /**
     * Delete the restaurant with the `id` and was created
     * by the currently logged in user.
     */
    await auth.user.restaurants().where('id', params.id).delete()

    /**
     * Flash success message
     */
    session.flash({ notification: 'Restaurant deleted successfully' })

    /**
     * Redirect back to the same page
     */
    response.redirect('back')
  }
}

module.exports = RestaurantController
