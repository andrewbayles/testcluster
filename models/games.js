const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  smallimage: { type: String, required: false },

  // largeimage: { type: String, required: false },

  genre: { type: String, required: true },
  system: { type: String, required: true }, // CHANGE
  summary: { type: String, required: false }, // CHANGE
  rating: { type: String, required: true }, // CHANGE, 1-5
  price: { type: String, required: true }, // CHANGE, decimal number
  quantity: { type: String, required: true } // CHANGE, number, zero behavior
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
