'use strict'

const User = use('App/Models/User')
const Config = use('Config')

class AuthController {
  /**
   * Redirect the user to the google
   */
  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }

  /**
   * Handle oauth2 callback
   */
  async handleCallback ({ ally, response, auth }) {
    /**
     * Pull the user after the redirect from Google. This method
     * is bound to throw exceptions. However, we handle them
     * inside the global exception handler
     */
    const allyUser = await ally.driver('google').getUser()

    /**
     * Data to be used for finding a user
     */
    const searchCriteria = { email: allyUser.getEmail() }

    /**
     * The user data to be persisted to the database
     */
    const userData = {
      email: allyUser.getEmail(),
      name: allyUser.getName(),
      avatar: allyUser.getAvatar()
    }

    /**
     * Find or create the user
     */
    const user = await User.findOrCreate(searchCriteria, userData)

    /**
     * Finally login the user
     */
    await auth.login(user)

    /**
     * Send them to the home page
     */
    response.redirect('/')
  }

  /**
   * Logout the user
   */
  async logout ({ auth, response }) {
    await auth.logout()
    response.redirect('/')
  }
}

module.exports = AuthController
