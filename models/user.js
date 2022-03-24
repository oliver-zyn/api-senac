const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fotoPerfil: {
        type: 'string',
    },
    nome: {
        type: 'string',
        required: true
    },
    sobreNome: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    telefone: {
        type: 'string',
    },
    senha: {
        type: 'string',
        required: true,
    },
    roles: {
        type: 'string',
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', schema);