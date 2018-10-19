'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response, view }) {
    /**
     * The route is not for logged in users. Usually when you are already
     * loggedin and trying to login again
     */
    if (error.code === 'E_GUEST_ONLY') {
      return response.send(view.render('errors.guest-only'))
    }

    /**
     * OAuth flow ended up in an error
     */
    if (error.name === 'OAuthException') {
      return response.send(view.render('errors.oauth'))
    }

    /**
     * If user session is invalid, then redirect them back to the
     * home page
     */
    if (error.name === 'InvalidSessionException') {
      response.redirect('/')
      return
    }

    /**
     * If error has a handler on itself, then call that
     */
    if (typeof (error.handle) === 'function') {
      return super.handle(...arguments)
    }

    /**
     * Render a generic error view. Apart from 404, we always show `Something went wrong` message.
     */
    const status = error.status || 500
    const message = status === 404 ? 'The page you are trying to find doesn\'t exists' : 'Something went wrong'
    return response.status(status).send(view.render('errors.index', { status, message }))
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
