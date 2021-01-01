// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

// CONFIGURATION
require('dotenv').config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

// MIDDLEWARE
app.use(express.static('assets'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// DATABASE
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))



// QUESTIONABLE. Research this.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

// Controllers
const gamesController = require('./controllers/games_controller.js')
app.use('/games', gamesController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

// Routes
app.get('/', (req, res) => {
  res.redirect('/games')
  // res.send('Hello World test')
})

// Listener
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
