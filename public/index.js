const grabFromDb = () => {
  const url = 'http://localhost:3000/api/v1/items'
  fetch(url)
  .then(items => items.json())
  .then(items => {
    clearItems()
    renderItems(items)
  })
}

grabFromDb()

const countItems = (items) => {
  $('.total-counter').append('<p>' + items.length + '</p>')
  let counter = items.reduce((acc, item) => {
    if(acc[item.clean]){
      acc[item.clean]++
    }else{
      acc[item.clean] = 1
    }
    return acc;
  }, {})
  console.log(counter)
}

const clearItems = () => {
  $('.items').html('')
  $('.total-counter').html('')
  $('.sparkling-counter').html('')
  $('.dusty-counter').html('')
  $('.rancid-counter').html('')
}

const renderItems = (items) => {
  items.map(item => {
    $('.items').append('<p>' + item.name + '</p>')
  })
  countItems(items)
}

$('.submit').on('click', (e) => {
  e.preventDefault()
  const name = $('.name-input').val()
  const reason = $('.reason-input').val()
  const clean = $('.clean-input').val()

  createNewItem(name, reason, clean)
  grabFromDb()
})

const createNewItem = (name, reason, clean) => {
  const url = 'http://localhost:3000/api/v1/items'

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      reason,
      clean,
    })
  })
}
