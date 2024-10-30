const express = require('express');
const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) return res.status(404).json({ mensagem: "Disciplina não encontrada" });
        
        const alunos = await Aluno.find({ fk_idTurma: req.params.id });
        res.status(200).json({ disciplina, alunos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, cargaHoraria, sala } = req.body;
    try {
        const disciplina = await Disciplina.create({ nome, cargaHoraria, sala });
        res.status(201).json(disciplina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!disciplina) return res.status(404).json({ mensagem: "Disciplina não encontrada" });
        res.status(200).json(disciplina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Aluno.deleteMany({ fk_idTurma: req.params.id });
        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        if (!disciplina) return res.status(404).json({ mensagem: "Disciplina não encontrada" });
        res.status(200).json({ mensagem: "Disciplina e alunos associados excluídos com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
