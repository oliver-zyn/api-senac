const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const authService = require('../services/auth');
const { transporter } = require('../services/email');
const app = require('../index');

const getUser = async (req, res, next) => {

    try{

        const user = await User.findOne();
        if(user.roles === 'user') {
            console.log('Usuário!')
        } else {
            console.log('Você tem total acesso ao sistema!');
        }
        res.status(200).send(user);

    }catch(err){
        console.log(err);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}


const createUser = async (req, res, next) => {
    try {
        const user = await User.create({
            nome: req.body.nome,
            sobreNome: req.body.sobreNome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: await bcrypt.hash(req.body.senha, 10),
            roles: req.body.roles,
        })
        await User.save;

        transporter.sendMail({
            from: 'jdmarvinmaeldestin02@gmail.com',
            to: user.email,
            subject: 'Cadastrado com sucesso!',
            html: `
            <div style="background: #000; padding: 10px; border-radius: .8rem; justify-content: center; height: 70vh;">
                <h1 style="color:#707070; text-align:center;">Seja Bem-vindo!!!</h1>
                <strong style="text-align:center;">${req.body.nome} é um prazer ter lo conosco!</strong>
                <div>
                    <p>Compre através do nosso site <a href="https://www.google.com">link</a> </p>
                </div>
                <footer>
                    <p style="text-decoration: underline;">Cantina do senac!</p>
                </footer>
            </div>
            `
        }, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 

        res.status(201).send({
            message: 'Usuário Cadastrado com sucesso!',
            nomeDoUsuario: req.body.nome
        });

    }catch(err){
        console.log(err);

        res.status(500).send('Falha na requicisão!');
    }
}

const authenticate = async (req, res, next) => {
    try {
        const userFind = await User.findOne({
            email: req.body.email,
        });

        if(!userFind) {
            res.status(404).send({ error: 'Usuário não encontrado!'});
            return;
        }

        const findPassword = bcrypt.compareSync(req.body.senha, userFind.senha); 
        
        if(!findPassword) {
            res.status(401).json({ error: 'Senha não encontrado' });
            return;
        }

        const token = await authService.generateToken({ email: userFind.email, senha: userFind.senha });
        
        res.status(201).send({ 
            token: token,
            data: {
                nome: userFind.nome,
                email: userFind.email,
            }
        });
    }catch(err){
        console.log(err);

        res.status(500).send({ error: 'Falha na requicisão!' });
    }
}

const refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await User.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};



module.exports = { getUser, createUser, authenticate, getUserById, refreshToken };