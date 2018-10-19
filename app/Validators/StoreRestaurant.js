'use strict'

class StoreRestaurant {
  get rules () {
    return {
      name: 'required',
      address: 'required',
      min_price: 'required',
      max_price: 'required',
      opens_at: 'required',
      closes_at: 'required',
      'url': 'url',
      'cover_image': 'file|file_types:image|file_size:2mb'
    }
  }

  get messages () {
    return {
      'name.required': 'Enter restaurant name',
      'address.required': 'Enter restaurant address',
      'min_price.required': 'Define the minimum price',
      'max_price.required': 'Define the maximum price',
      'opens_at.required': 'Enter restaurant opening time',
      'closes_at.required': 'Enter restaurant closing time',
      'url.url': 'Enter valid website url',
      'cover_image.file': 'Upload cover image',
      'cover_image.file_types': 'Make sure to upload image only',
      'cover_image.file_size': 'Cover image size must be under 2mb'
    }
  }

  get sanitizationRules () {
    return {
      'min_price': 'to_cents',
      'max_price': 'to_cents'
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = StoreRestaurant
