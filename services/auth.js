'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken  = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d'});
}

exports.decodeToken = async (token) => {
    let data = jwt.verify(token, process.env.SALT_KEY);
    return data;
}

exports.authrize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-acces-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito!'
        })
    } else {
        jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Token Invalido'
                });
            } else {
                next();
            }
        })
    }
}

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};