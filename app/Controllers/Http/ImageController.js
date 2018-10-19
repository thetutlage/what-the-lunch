'use strict'

const Helpers = use('Helpers')

class ImageController {
  /**
   * Stream image from the uploads directory
   */
  async show ({ params, response }) {
    response.download(Helpers.tmpPath(`uploads/${params.slug}`))
  }
}

module.exports = ImageController
