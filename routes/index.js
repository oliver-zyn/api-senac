'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        message: 'API SENAC',
        version: '0.0.1'
    })
})

router.get('/test', (req, res) => {
    res.render('pages/read', { title: 'Test' })
})

router.get('/products', (req, res) => {
    res.render('pages/products', { title: 'Produtos' })
})

router.get('/usuarios', (req, res) => {
    res.render('pages/users', { title: 'Usuários' })
})

router.get('/orders', (req, res) => {
    res.render('pages/orders', { title: 'Compras' })
})

module.exports = router;