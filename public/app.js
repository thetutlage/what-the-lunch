$(function () {
  $('[data-action="dropdown"]').click(function (e) {
    e.preventDefault()
    $(this).parent().toggleClass('active')
  })

  $('[data-id="amount"]').each(function (index, element) {
    new Cleave(element, {
      numeral: true,
      numeralIntegerScale: 4,
      numeralPositiveOnly: true,
      rawValueTrimPrefix: true,
      prefix: '€ '
    })
  })

  $('[data-id="timing"]').each(function (index, element) {
    new Cleave(element, {
      time: true,
      timePattern: ['h', 'm']
    })
  })

  $('[data-action="toggleParent"]').click(function (e) {
    e.preventDefault()
    $(this).closest('[data-id="parent"]').toggleClass('active')
  })

  $('#visitedRestaurantHandler').click(function (e) {
    e.preventDefault()
    const url = $(this).attr('href')
    console.log(e)

    axios({
      url,
      method: 'post'
    }).then(() => {
      console.log('done')
    }).catch((error) => {
      console.log(error)
    })
  })

  if ($('.notification-banner').length) {
    setTimeout(function () {
      $('.notification-banner').addClass('notification-hidden')
    }, 5000)
  }
})
