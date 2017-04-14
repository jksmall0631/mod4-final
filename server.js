const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Garage Thing'
app.locals.items = [
  {id:1, name:'dead rat', reason: 'don\'t want to touch it', clean: 'rancid'},
  {id:2, name:'hoopdie', reason: 'dope old car', clean: 'dusty'},
]
app.locals.counter = 2

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    res.send(file)
  });
})

app.get('/api/v1/items', (req, res) => {
  res.status(200).json(app.locals.items)
})

app.get('/api/v1/items/:id', (req, res) => {
  const {id} = req.params
  const item = app.locals.items.map(item => {
    if(item.id == id){
      res.status(200).json(item)
    }
  })
})

app.post('/api/v1/items', (req, res) => {
  const {name, reason, clean} = req.body
  const item = {id: app.locals.counter++, name, reason, clean}
  if(name && reason && clean){
    app.locals.items.push(item)
    res.status(200).json(item)
  }else{
    res.sendStatus(422)
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
