'use strict'

const filmModel = require('../models/film');

//All films
function getFilms(req, res) {
    filmModel
        .find({})
        .populate('author')
        .exec((err, results) => {
            if (err) return res.status(500).send({ message: `Error when making the request: ${err}` })
            if (!results) return res.status(404).send({ message: `There are no results` })
            res.status(200).send({ results })
        })
}
//Film by id
function getFilm(req, res) {
    let id = req.params.id
    filmModel
        .findById(id)
        .populate('author')
        .exec((err, film) => {
            if (err) {
                res.status(500).send({ message: `Error when making the request: ${err}` })
            }
            if (!film) {
                res.status(404).send({ message: `Film does not exist` })
            }
            res.status(200).send({ film })
        })
}
//Insert Film
function saveFilm(req, res) {
    let film = new filmModel()
    film.name = req.body.name
    film.rate = req.body.rate
    film.poster_path = req.body.poster_path
    film.description = req.body.description
    film.author = req.body.author
    film.save((err, film) => {
        if (err) {
            res.status(500).send({ message: `Error Saving to Database: ${err}` })
        }
        res.status(200).send({ film })
    })
}
//Update Film by id
function updateFilm(req, res) {
    let id = req.params.id
    let update = req.body
    filmModel.findByIdAndUpdate(id, update, (err, productoUpdate) => {
        if (err) {
            res.status(500).send({ message: `Film Update Failed: ${err}` })
        }
        res.status(200).send({ film: productoUpdate })
    })
}
//Delete Film by id
function deleteFilm(req, res) {
    let id = req.params.id
    filmModel.findById(id, (err, film) => {
        if (err) {
            res.status(500).send({ message: `Error Deleting Film: ${err}` })
        }
        if (film) {
            film.remove(err => {
                if (err) res.status(404).send({ message: `Film does not exist` })
                res.status(200).send({ message: "Film has been removed" })
            })
        } else {
            res.status(500).send({ message: `Error Deleting Film: ${err}` })
        }
    })
}

module.exports = {
    getFilms,
    getFilm,
    saveFilm,
    updateFilm,
    deleteFilm
}