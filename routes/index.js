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

router.get('/read', (req, res) => {
    res.render('pages/produtos', { title: 'Read' })
})

router.get('/create', (req, res) => {
    res.render('pages/read', { title: 'Create' })
})

router.get('/delete', (req, res) => {
    res.render('pages/read', { title: 'Delete' })
})

module.exports = router;