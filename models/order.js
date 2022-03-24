'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }]
});

module.exports = mongoose.model('Order', schema);