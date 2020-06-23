'use strict'

// require in dependencies, model, middleware
const express = require('express')
// const passport = require('passport')
// const removeBlanks = require('../../lib/remove_blank_fields')
// const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const mtg = require('mtgsdk')
// ************************************* //

// GET cards from mtgAPI (mtg): Index cards.
router.get('/mtg-all', (req, res, next) => {
  mtg.card.where({})
    .then(cards => {
      return cards.map((card) => ({
        name: card.name,
        type: card.type,
        manaCost: card.manaCost,
        colors: card.colors,
        power: card.power,
        toughness: card.toughness,
        imageUrl: card.imageUrl
      }))
    })
    .then(cards => res.status(200).json({ cards: cards }))
    .catch(next)
})

// GET cards from mtgAPI (mtg): Search by partial card name.
router.get('/mtg-name', (req, res, next) => {
  const searchCardName = req.body.cardName
  mtg.card.where({ name: searchCardName })
    .then(cards => {
      return cards.map((card) => ({
        name: card.name,
        type: card.type,
        manaCost: card.manaCost,
        colors: card.colors,
        power: card.power,
        toughness: card.toughness,
        imageUrl: card.imageUrl
      }))
    })
    .then(cards => res.status(200).json({ cards: cards }))
    .catch(next)
})

// GET cards from mtgAPI (mtg): Search by the card's mana color.
router.get('/mtg-colors', (req, res, next) => {
  const searchByCardColor = req.body.cardColor
  mtg.card.where({ colors: searchByCardColor })
    .then(cards => {
      return cards.map((card) => ({
        name: card.name,
        type: card.type,
        manaCost: card.manaCost,
        colors: card.colors,
        power: card.power,
        toughness: card.toughness,
        imageUrl: card.imageUrl
      }))
    })
    .then(cards => res.status(200).json({ cards: cards }))
    .catch(next)
})

module.exports = router
