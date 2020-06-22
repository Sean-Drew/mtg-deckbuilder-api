'use strict'

const mongoose = require('mongoose')

const playDeckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ownerNotes: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 400,
    trim: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  manaColor: {
    type: String,
    required: false,
    trim: true
  },
  cardsInDeck: []
})

module.exports = mongoose.model('PlayDeckSchema', playDeckSchema)
