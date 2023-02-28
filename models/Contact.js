const express = require('express')
const { default: mongoose } = require('mongoose')

const Contact = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('Contact', Contact);
