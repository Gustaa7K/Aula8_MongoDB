const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Importando os novos controladores
const alunoController = require('./controllers/alunoController');
app.use('/alunos', alunoController);
const disciplinaController = require('./controllers/disciplinaController');
app.use('/disciplinas', disciplinaController);

// Conexão com o banco de dados
mongoose.connect('mongodb://127.0.0.1:27017/aula10')
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 3000');
        })
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;
