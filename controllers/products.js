const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

const getProducts = async (req, res, next) => {
    try{
        const products = await Produto.find({})
        res.status(200).send(products);
    }
    catch(err){
        console.log(err);
    }
}

const getProductById = async (req, res, next) => {
    try{
        const products = await Produto.findById(req.body.id);
        res.status(200).send(products);
    }
    catch(err){
        console.log(err);
    }
}

const createProducts = async (req, res, next) => {
    try{
        const products = await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco,
            imagem: req.body.imagem,
            descricao: req.body.descricao,
        })
        res.status(200).send('Produto cadastrado com sucesso!');
    }
    catch(err){
        console.log(err);
    }
}

const updateProduct = async (req, res, next) => {
    try{
        const products = await Produto.findOneAndUpdate(req.body.id, req.body);
        res.status(200).send(products);
    }
    catch(err){
        console.log(err);
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const products = await Produto.findByIdAndDelete(req.body.id);
        res.status(200).send(products);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { getProducts, createProducts, getProductById, updateProduct, deleteProduct };

