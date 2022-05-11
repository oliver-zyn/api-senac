const nodemailer = require('nodemailer')
require('dotenv').config({path: '../.env'});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SENHA_EMAIL
  }
});

module.exports = { transporter }