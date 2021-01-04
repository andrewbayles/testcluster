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

  // if (req.body.readyToEat === 'on') {
  //   req.body.readyToEat = true
  // } else {
  //   req.body.readyToEat = false
  // }

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

  // if (req.body.readyToEat === 'on') {
  //   req.body.readyToEat = true
  // } else {
  //   req.body.readyToEat = false
  // }

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
        title: 'Bionic Commando',
        smallimage: 'bionic-commando.png',
        largeimage: '',
        genre: 'Action-adventure',
        system: 'NES',
        summary: 'Lorum ipsum',
        rating: '3',
        price: '$26',
        quantity: '4'
      },
      {
        title: 'Castlevania',
        smallimage: 'castlevania.png',
        largeimage: '',
        genre: 'Action-adventure',
        system: 'NES',
        summary: 'Vampire hunting',
        rating: '5',
        price: '$30',
        quantity: '2'
      },
      {
        title: 'Double Dragon',
        smallimage: 'double-dragon.png',
        largeimage: '',
        genre: 'Side-scrolling beat-em up',
        system: 'NES',
        summary: 'Street brawler',
        rating: '4',
        price: '$25',
        quantity: '5'
      },
      {
        title: 'Faxanadu',
        smallimage: 'faxanadu.png',
        largeimage: '',
        genre: 'Action RPG',
        system: 'NES',
        summary: 'Side-scrolling adventure game',
        rating: '2',
        price: '$22',
        quantity: '10'
      },
      {
        title: 'Final Fantasy',
        smallimage: 'final-fantasy.png',
        largeimage: '',
        genre: 'Classic top-down RPG',
        system: 'NES',
        summary: 'Role playing game',
        rating: '5',
        price: '$45',
        quantity: '7'
      },
      {
        title: 'The Guardian Legend',
        smallimage: 'guardian-legend.png',
        largeimage: '',
        genre: 'Action-adventure explorer',
        system: 'NES',
        summary: 'Action-adventure explorer-shooter title',
        rating: '3',
        price: '$20',
        quantity: '14'
      },
      {
        title: 'Metal Gear',
        smallimage: 'metal-gear.png',
        largeimage: '',
        genre: 'Military explorer adventure',
        system: 'NES',
        summary: 'Top-down military adventure game',
        rating: '4',
        price: '$28',
        quantity: '5'
      },
      {
        title: 'Skate or Die',
        smallimage: 'skate-or-die.png',
        largeimage: '',
        genre: 'Competitive skating',
        system: 'NES',
        summary: 'Competitive skating game',
        rating: '3',
        price: '$28',
        quantity: '6'
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
