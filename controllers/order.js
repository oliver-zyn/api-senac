'use strict';


const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const guid = require('guid');
const authService = require('../services/auth')

exports.get = async(req, res, next) => {
    try {
        const data = await Order.find({})
        .populate('user')
        .populate('items.product');
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
}

exports.post = async(req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);
    
    try {
        await Order.create({
            nome: req.body.nome,
            number: data.number = guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({ message: "Pedido cadastrado com sucesso!"})
    }
    catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        })
    }
};