const express = require('express')
const Game = require('../models/games.js')
const games = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// NEW
games.get('/new', (req, res) => {

  if (req.session.currentUser) {

    res.render(
      'games/new.ejs', {
      currentUser: req.session.currentUser
    })

  } else {
    res.redirect('/sessions/new')
  }

})

// EDIT
games.get('/:id/edit', (req, res) => {
  Game.findById(req.params.id, (error, foundGame) => {
    res.render('games/edit.ejs', {
      game: foundGame
      ,currentUser: req.session.currentUser
    })
  })
})

// DELETE
games.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, deletedGame) => {
    res.redirect('/games')
  })
})

// SHOW
games.get('/:id', (req, res) => {

  // if (req.session.currentUser) {

    Game.findById(req.params.id, (error, foundGame) => {
      res.render('games/show.ejs', {
        game: foundGame
        ,currentUser: req.session.currentUser
      })
    })

  // } else {
  //   res.redirect('/sessions/new')
  // }

})

// UPDATE
games.put('/:id', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect('/games')
    }
  )
})

// CREATE
games.post('/', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  Game.create(req.body, (error, createdGame) => {
    res.redirect('/games')
  })
})

// INDEX
games.get('/', (req, res) => {
  Game.find({}, (error, allGames) => {
    res.render('games/index.ejs', {
      games: allGames
      ,currentUser: req.session.currentUser
    })
  })
})

// SEED ROUTE
games.get('/setup/seed', (req, res) => {
  Game.create(
    [
      {
        name: 'Contra',
        color: 'red'
      },
      {
        name: 'Chrono Trigger',
        color: 'purple'
      },
      {
        name: 'Mario Kart',
        color: 'green'
      }
    ],
    (error, data) => {
      res.redirect('/games')
    }
  )
})

// Drop DB Route
games.get(
  '/dropdatabase/cannotundo/areyoursure/reallysure/okthen',
  (req, res) => {
    Game.collection.drop()
    res.send('You did it! You dropped the database!')
  }
)

module.exports = games
