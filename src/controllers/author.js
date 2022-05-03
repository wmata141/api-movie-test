'use strict'

const authorModel = require('../models/author')

//All users
function getAuthors(req, res) {
    authorModel.find({}, (err, results) => {
        if (err) return res.status(500).send({ message: `Error when making the request: ${err}` })
        if (!results) return res.status(404).send({ message: `There are no results` })
        res.status(200).send({ results })
    })
}
//Insert Author
function saveAuthor(req, res) {    
    let author = new authorModel()
    author.name = req.body.name
    author.save((err, author) => {        
        if (err) {
            console.log("err",err);
            res.status(500).send({ message: `Error Saving to Database: ${err}` })
        }
        res.status(200).send({ author })
    })
}

//Delete user by id
function deleteAuthor(req, res) {
    let id = req.params.id
    authorModel.findById(id, (err, user) => {
        if (err) {
            res.status(500).send({ message: `Error Deleting Author: ${err}` })
        }
        user.remove(err => {
            if (err) res.status(404).send({ message: `Author does not exist` })
            res.status(200).send({ message: "Author has been removed" })
        })
    })
}

module.exports = {
    getAuthors,
    deleteAuthor,
    saveAuthor
}