'use strict'

// require in dependencies, model, middleware
const express = require('express')
const passport = require('passport')
const PlayDeck = require('../models/playDeck')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// ************************************* //

// INDEX - GET /decks
router.get('/decks', requireToken, (req, res, next) => {
  PlayDeck.find()
    .then(decks => {
      return decks.map(deck => deck.toObject())
    })
    .then(decks => res.status(200).json({ decks: decks }))
    .catch(next)
})

// SHOW - GET /decks/<id>
router.get('/decks/:id', requireToken, (req, res, next) => {
  PlayDeck.findById(req.params.id)
    .then(handle404)
    .then(deck => res.status(200).json({ deck: deck.toObject() }))
    .catch(next)
})

// CREATE - POST /decks
router.post('/decks', requireToken, (req, res, next) => {
  req.body.deck.owner = req.user.id
  // console.log('req.body.deck.owner is', req.body.deck.owner)
  // console.log('req.user.id is', req.user.id)
  // console.log('req.body is', req.body)

  PlayDeck.create(req.body.deck)
    .then(deck => {
      console.log('deck is', deck)
      res.status(201).json({ deck: deck.toObject() })
    })
    .catch(next)
})

// UPDATE - PATCH /decks/<id>
router.patch('/decks/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.owner

  PlayDeck.findById(req.params.id)
    .then(handle404)
    .then(deck => {
      requireOwnership(req, deck)
      return deck.updateOne(req.body.deck)
    })
    .then((deck) => {
      return res.sendStatus(204)
    })
    .catch(next)
})

// DESTROY - DELETE /decks/<id>
router.delete('/decks/:id', requireToken, (req, res, next) => {
  PlayDeck.findById(req.params.id)
    .then(handle404)
    .then(deck => {
      requireOwnership(req, deck)
      deck.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
