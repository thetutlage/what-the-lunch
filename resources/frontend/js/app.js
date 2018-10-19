Object.prototype.document = window.document;
Object.prototype.location = window.location;
const $ = require('zepto')
delete(Object.prototype.document);
delete(Object.prototype.location);

const Cleave = require('cleave.js')
require('../styles/app.css')

$(function () {
  /**
   * Format amount fields inside the restaurant forms
   */
  $('[data-id="amount"]').each(function (index, element) {
    new Cleave(element, {
      numeral: true,
      numeralIntegerScale: 4,
      numeralPositiveOnly: true,
      rawValueTrimPrefix: true,
      prefix: '€ '
    })
  })

  /**
   * Format timing fields inside the restaurant forms
   */
  $('[data-id="timing"]').each(function (index, element) {
    new Cleave(element, {
      time: true,
      timePattern: ['h', 'm']
    })
  })

  /**
   * Toggle the parent by toggling active class
   */
  $('[data-action="toggleParent"]').click(function (e) {
    e.preventDefault()
    $(this).closest('[data-id="parent"]').toggleClass('active')
  })

  /**
   * Hide notification banner after 5 seconds (if exists)
   */
  if ($('.notification-banner').length) {
    setTimeout(function () {
      $('.notification-banner').addClass('notification-hidden')
    }, 5000)
  }
})
