'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Authentication routes
 */
Route.get('login/redirect', 'AuthController.redirect').middleware('guest')
Route.get('login/callback', 'AuthController.handleCallback').middleware('guest')
Route.get('logout', 'AuthController.logout')

/**
 * Serving uploaded images
 */
Route.get('uploads/:slug', 'ImageController.show')

/**
 * Rendering the home page
 */
Route.get('/', 'RestaurantController.indexRecent')

/**
 * Restaurant visitors management
 */
Route
  .post('restaurants/:id/visitor', 'RestaurantVisitorController.store')
  .middleware('auth')

/**
 * Restaurant visitors management
 */
Route
  .get('users/:id/restaurants', 'UserRestaurantController.index')
  .middleware('auth')


/**
 * Managing restaurants
 */
Route
  .resource('restaurants', 'RestaurantController')
  .middleware(new Map([
    [['create', 'store', 'edit', 'update', 'destroy'], 'auth']
  ]))
  .validator(new Map([
    ['store', 'StoreRestaurant'],
    ['update', 'UpdateRestaurant']
  ]))
