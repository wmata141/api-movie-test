'use strict'

const express = require('express')
const filmCtrl = require('../controllers/film')
const authorCtrl = require('../controllers/author')

const router = express.Router()

router.get('/film', filmCtrl.getFilms)
router.get('/film/:id', filmCtrl.getFilm)
router.post('/film', filmCtrl.saveFilm)
router.put('/film/:id', filmCtrl.updateFilm)
router.delete('/film/:id', filmCtrl.deleteFilm)

router.get('/author', authorCtrl.getAuthors)
router.post('/author', authorCtrl.saveAuthor)
router.delete('/author/:id', authorCtrl.deleteAuthor)

module.exports = router
