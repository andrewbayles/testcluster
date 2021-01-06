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
  Game.findById(req.params.id, (error, foundGame) => {
    res.render('games/show.ejs', {
      game: foundGame
      ,currentUser: req.session.currentUser
    })
  })
})

// UPDATE
games.put('/:id', (req, res) => {
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
        summary: 'Bionic Commando, originally released as Hitler\'s Resurrection: Top Secret, is an action-platformer video game released by Capcom for the Family Computer and Nintendo Entertainment System in 1988. It is based on the 1987 arcade game of the same title. As Ladd, a member of the FF Battalion, the player has to explore each stage and obtain the necessary equipment to progress. Ladd is equipped with a mechanical arm featuring a grappling gun, allowing him to pull himself forward or swing from the ceiling. As such, the series is one of few instances of a platform game in which the player cannot jump. To cross gaps or climb ledges, Ladd must use his bionic arm.',
        rating: '3',
        price: '26',
        quantity: '4'
      },
      {
        title: 'Castlevania',
        smallimage: 'castlevania.png',
        largeimage: '',
        genre: 'Action-adventure',
        system: 'NES',
        summary: 'Castlevania is an action-platformer video game developed and published by Konami for the Family Computer Disk System video game console in Japan in September 1986. It was ported to cartridge format and released in North America for the Nintendo Entertainment System (NES) in May 1987 and in Europe in 1988. It was also re-issued for the Family Computer in cartridge format in 1993. Players control Simon Belmont, who has entered Castlevania to defeat Count Dracula. It is the first game in Konami\'s Castlevania video game series.',
        rating: '5',
        price: '30',
        quantity: '2'
      },
      {
        title: 'Double Dragon',
        smallimage: 'double-dragon.png',
        largeimage: '',
        genre: 'Beat \'em up',
        system: 'NES',
        summary: 'Double Dragon, is a 1987 beat \'em up video game developed by Technōs Japan and distributed in North America, Europe, Southeast Asia, Hong Kong, mainland China and Taiwan by Taito. The game is a spiritual and technological successor to Technos\' earlier beat \'em up, Nekketsu Kōha Kunio-kun (released outside of Japan by Taito as Renegade), but introduced several additions such as two-player cooperative gameplay and the ability to arm oneself with an enemy\'s weapon after disarming them. Double Dragon is considered to be one of the first successful examples of the genre, resulting in the creation of two arcade sequels and several spinoffs, as well as inspiring other companies in creating their own beat \'em ups.',
        rating: '4',
        price: '25',
        quantity: '5'
      },
      {
        title: 'Faxanadu',
        smallimage: 'faxanadu.png',
        largeimage: '',
        genre: 'Action RPG',
        system: 'NES',
        summary: 'Faxanadu is an action role-playing platform-adventure video game for the Family Computer (Famicom) and Nintendo Entertainment System (NES). The name was licensed by computer game developer Nihon Falcom ("Falcom") and was developed and released in Japan by Hudson Soft in 1987. Nintendo of America released the game in the United States in 1989 as a first-party title under license from Hudson Soft. Mattel distributed the game for Nintendo in PAL territories in 1990. Faxanadu is a spin-off or side-story of Xanadu, which is the second installment of Falcom\'s long-running RPG series, Dragon Slayer. The title Faxanadu is a portmanteau formed from the names Famicom and Xanadu. The game uses side-scrolling and platforming game-play, while employing role-playing elements with an expansive story and medieval setting.',
        rating: '2',
        price: '22',
        quantity: '10'
      },
      {
        title: 'Final Fantasy',
        smallimage: 'final-fantasy.png',
        largeimage: '',
        genre: 'Classic top-down RPG',
        system: 'NES',
        summary: 'Final Fantasy is a fantasy role-playing video game developed and published by Square in 1987. It is the first game in Square\'s Final Fantasy series, created by Hironobu Sakaguchi. Originally released for the NES, Final Fantasy was remade for several video game consoles and is frequently packaged with Final Fantasy II in video game collections. The story follows four youths called the Light Warriors, who each carry one of their world\'s four elemental orbs which have been darkened by the four Elemental Fiends. Together, they quest to defeat these evil forces, restore light to the orbs, and save their world. Final Fantasy was originally conceived under the working title Fighting Fantasy, but trademark issues and dire circumstances surrounding Square as well as Sakaguchi himself prompted the name to be changed. The game was a great commercial success, received generally positive reviews, and spawned many successful sequels and supplementary titles in the form of the Final Fantasy series.',
        rating: '5',
        price: '45',
        quantity: '7'
      },
      {
        title: 'The Guardian Legend',
        smallimage: 'guardian-legend.png',
        largeimage: '',
        genre: 'Action-adventure',
        system: 'NES',
        summary: 'The Guardian Legend is a 1988 hybrid action-adventure/shoot \'em up video game developed by Compile for the Nintendo Entertainment System (NES). It is the sequel to the 1986 MSX game Guardic, and was published and released in Japan by Irem in 1988, in North America by Broderbund in 1989, and in Europe by Nintendo in 1990. It incorporates gameplay elements from other games such as The Legend of Zelda, Metroid, and 1942. In the game, the player controls a lone protagonist, the Guardian, who is on a quest to destroy a large alien-infested world named Naju before it reaches the planet Earth. The player must deactivate ten safety devices scattered throughout Naju, thus activating the alien world\'s self-destruct sequence. The player explores Naju in a non-linear fashion and can acquire different weapons during the course of the game.',
        rating: '3',
        price: '20',
        quantity: '14'
      },
      {
        title: 'Metal Gear',
        smallimage: 'metal-gear.png',
        largeimage: '',
        genre: 'Military adventure',
        system: 'NES',
        summary: 'Metal Gear is an overhead military action-adventure stealth video game originally released in 1987 by Konami for the MSX2 computer in Japan and parts of Europe. Considered the game to popularize the stealth game genre, it was the first video game to be fully developed by Hideo Kojima, who would go on to direct most of the games in the Metal Gear series. Players control Solid Snake, an operative of the special forces unit FOXHOUND, who goes on a solo infiltration mission into the fortified state of Outer Heaven to destroy Metal Gear, a bipedal walking tank capable of launching nuclear missiles from anywhere in the world, as well as rescue a number of fellow agents who have been captured by the enemy. The game was a major international success, with the NES version selling 1 million units in the United States.',
        rating: '4',
        price: '28',
        quantity: '5'
      },
      {
        title: 'Skate or Die',
        smallimage: 'skate-or-die.png',
        largeimage: '',
        genre: 'Competitive skating',
        system: 'NES',
        summary: 'Skate or Die! is a skateboarding game released by Electronic Arts in 1987 for the Sinclair ZX Spectrum, Commodore 64, Atari ST, Apple IIgs, Amstrad CPC, and IBM Compatibles running MS-DOS. It was ported to the Nintendo Entertainment System (NES) by Konami, and published by Ultra Games. The Atari ST conversion was contracted to Codemasters, who contracted Kinetic Designs to do the work.',
        rating: '3',
        price: '28',
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
