// Imports
const express = require('express');
const http = require('http');
//const debug = require('debug')('api-senac:index');

const cors = require('cors')
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
require('dotenv').config();

const corsOptions = {
    exposedHeaders: ['x-access-token']
};


// models
const User = require('./models/user');
const Produto = require('./models/products');
const Order = require('./models/order');

// App settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
mongoose.connect(process.env.DB_CONNECT_KEY);
app.set('view engine', 'ejs');

const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const indexRouter = require('./routes/index');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// Rotas user
app.use('/users', userRouter);

// Rotas Produto
app.use('/produtos', productRouter);

// compras
app.use('/compras', orderRouter);
app.use('/', indexRouter);


// Server
const server = http.createServer(app);
console.log('Server runing!');

server.listen(PORT);

module.exports = app;