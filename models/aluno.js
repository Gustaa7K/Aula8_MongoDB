const mongoose = require('mongoose');

const Aluno = mongoose.model('Aluno', {
    nome: String,
    idade: Number,
    ra: String,
    fk_idTurma: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Disciplina' 
    }
});

module.exports = Aluno;
