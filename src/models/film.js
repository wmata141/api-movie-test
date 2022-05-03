'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FilmSchema = Schema({
    name: { type: String, required: true },
    rate: { type: Number, default: 0, min: 0, max: 10 },
    description: { type: String, required: false },
    poster_path: { type: String, required: false },
    author: { type: Schema.ObjectId, ref: "Author" }
})

module.exports = mongoose.model('Film', FilmSchema)