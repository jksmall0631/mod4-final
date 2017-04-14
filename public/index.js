const {} = require('../public/index.js');

let dbItems;
let sorted = false;

$('.clicker').on('click', () => {
  $('.garage-door').toggle('.hide')
})

const grabFromDb = () => {
  const url = '/api/v1/items'
  fetch(url)
  .then(items => items.json())
  .then(items => {
    dbItems = items
    clearItems()
    renderItems(items)
  })
}

grabFromDb()

const countItems = (items) => {
  let counter = items.reduce((acc, item) => {
    if(acc[item.clean]){
      acc[item.clean]++
    }else{
      acc[item.clean] = 1
    }
    return acc;
  }, {})
  renderCounts(items, counter)
}

const renderCounts = (items, counter) => {
  $('.total-counter').append('<p>' + items.length + '</p>')
  $('.sparkling-counter').append('<p>' + counter.sparkling + '</p>')
  $('.dusty-counter').append('<p>' + counter.dusty + '</p>')
  $('.rancid-counter').append('<p>' + counter.rancid + '</p>')
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
    $('.items').append('<p class="item" id=' + item.id + '>' + item.name + '</p>')
  })
  countItems(items)
}

$('.items').on('click', '.item', (e) => {
  $('.item-description').html('')
  renderDescription(e.target.id)
})

const renderDescription = (targetId) => {
  dbItems.forEach(item => {
    if(item.id == targetId){
      $('.item-description').append('<h3>' + item.name + '</h3><p>' + item.reason + '</p><p>' + item.clean + '</p>')
    }
  })
}

$('.sort').on('click', () => {
  let sortedItems
  if(sorted === false){
    sortedItems = dbItems.sort((a, b) => {
      if(a.name.toLowerCase()<b.name.toLowerCase())return -1
      if(a.name.toLowerCase()>b.name.toLowerCase())return 1
    })
    sorted = true;
  }else{
    sortedItems = dbItems.sort((a, b) => {
      if(a.name.toLowerCase()<b.name.toLowerCase())return 1
      if(a.name.toLowerCase()>b.name.toLowerCase())return -1
    })
    sorted = false;
  }
  clearItems()
  renderItems(sortedItems);
})

$('.submit').on('click', (e) => {
  e.preventDefault()
  const name = $('.name-input').val()
  const reason = $('.reason-input').val()
  const clean = $('.clean-input').val()

  createNewItem(name, reason, clean)
  grabFromDb()
  sorted = false;
})

const createNewItem = (name, reason, clean) => {
  const url = '/api/v1/items'

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
