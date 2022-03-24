const express = require('express');
const app = express();
const pdf = require('html-pdf');
const ejs = require('ejs');

app.use(express.json());

app.get('/', (req, res) => {

    ejs.renderFile('./templates/index.ejs', { name: 'Geovanna - Render pdf'}, (err, html) => {
        if (err) {
            return res.status(500).send({ message: 'Ocorreu um erro!' })
        }

        const options = {
            format: 'A4',
            border: {
                right: '8'
            }
        }

        pdf.create(html, options).toFile('./uploads/relatorio.pdf', (err, pdf) => {
            if (!err) {return res.status(201).send({ message: 'PDF Generated!'})}
            else {
                return res.status(500).send({ message: 'Failed'})
            }
        }) 
    });


    res.json({
        message: 'Hello, Marvin!'
    })
})

app.listen(5000)