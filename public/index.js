const grabFromDb = () => {
  const url = 'http://localhost:3000/api/v1/items'
  fetch(url)
  .then(items => items.json())
  .then(items => renderItems(items))
}

grabFromDb();

const renderItems = (items) => {
}

$('.submit').on('click', (e) => {
  e.preventDefault()
  console.log('bla')
})
