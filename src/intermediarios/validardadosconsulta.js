let { consultorio } = require("../bancodedados");

const validarDadosConsulta = (req, res, next) => {
    const { tipoConsulta, valorConsulta } = req.body;
    const tipoDisponivel = consultorio.medicos.some((medicos) => {
        return medicos.especialidade === tipoConsulta
    })

    if (!tipoConsulta || !valorConsulta) {
        return res.status(400).json({ "mensagem": "todos os campos são obrigatórios!" });
    }
    if (!tipoDisponivel) {
        return res.status(400).json({ "mensagem": "Especialidade não disponível no momento!" });
    }
    if (isNaN(Number(valorConsulta))) {
        return res.status(400).json({ "mensagem": "valor da consulta com formato inválido!" });
    }
    next()
}
module.exports = validarDadosConsulta